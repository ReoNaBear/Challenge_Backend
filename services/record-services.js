const { PunchRecord, PresentRecord, QRcodeAuth } = require('../models')
const helper = require('../_helpers')
const moment = require('moment');
const { DATE } = require('sequelize');
const crypto = require("crypto");
const recordServices = {
  postPunchRecord: async (req, cb) => {
    try {
      const userId = helper.getUser(req).userId
      if (!userId) throw new Error('Please login first!')
      const dateFormat = "YYYY-MM-DD"
      const timeFormat = "YYYY-MM-DD HH:mm:ss"
      //先固定為台北
      const timezone = "Asia/Taipei"
      const now = new moment().utc().tz("Europe/London").tz(timezone);
      //每天五點到隔天五點
      let date = now.clone().subtract(5, "hours").format(dateFormat);
      let time = now.format(timeFormat).toString();
      if (!date || !time) throw new Error('Time Error! Please contact your administrator')
      const postPunchRecord = await PunchRecord.create({
        userId: userId,
        date: date,
        time: time
      })

      const presentData = await PresentRecord.findOne({ where: { userId: userId, date: date } })
      //如果是第一筆 => 上班打卡
      if (!presentData) {
        const firstPresent = await PresentRecord.create({
          userId: userId,
          date: date,
          work: time,
          offWork: null,
          status: 0
        })
        const result = JSON.stringify({
          PunchRecord: postPunchRecord, PresentRecord: firstPresent
        })
        return cb(null, result)
        //如果不是 => 下班打卡並計算是否超過9小時  (8小時上班+中午休1小)
        //todo 如果超過10個小時開始算加班(10小 = 上班9小+30分鐘法定休息時間+30分鐘加班時間)
      } else {
        let status = 0
        const workTime = moment.tz(presentData.work, timezone)
        const offWorkTime = moment.tz(time, timezone)
        const duration = offWorkTime.diff(workTime, 'minutes')
        if (duration >= 540) {
          status = 1
        }
        const updatePresent = await presentData.update({
          offWork: time,
          status: status
        })
        const result = JSON.stringify({
          PunchRecord: postPunchRecord, PresentRecord: updatePresent
        })
        return cb(null, result)
      }
    } catch (err) {
      cb(err)
    }
  },
  qrcodePunchRecord: async (req, cb) => {
    try {
      const userId = helper.getUser(req).userId
      if (!userId) throw new Error('Please login first!')

      const { secretCode } = req.body
      //現在沒有其他公司 先固定為TW
      const companyCode = "TW"
      const correctSecret = await QRcodeAuth.findOne({ where: { companyCode: companyCode }})
      if(correctSecret.secretCode !== secretCode)  throw new Error('Please try again later!')

      await correctSecret.update({
        updatedAt: Date.now(),
        secretCode: crypto.randomUUID(),
      })

      const dateFormat = "YYYY-MM-DD"
      const timeFormat = "YYYY-MM-DD HH:mm:ss"
      //先固定為台北
      const timezone = "Asia/Taipei"
      const now = new moment().utc().tz("Europe/London").tz(timezone);
      //每天五點到隔天五點
      let date = now.clone().subtract(5, "hours").format(dateFormat);
      let time = now.format(timeFormat).toString();
      if (!date || !time) throw new Error('Time Error! Please contact your administrator')
      const postPunchRecord = await PunchRecord.create({
        userId: userId,
        date: date,
        time: time
      })

      const presentData = await PresentRecord.findOne({ where: { userId: userId, date: date } })
      //如果是第一筆 => 上班打卡
      if (!presentData) {
        const firstPresent = await PresentRecord.create({
          userId: userId,
          date: date,
          work: time,
          offWork: null,
          status: 0
        })
        const result = JSON.stringify({
          PunchRecord: postPunchRecord, PresentRecord: firstPresent
        })
        return cb(null, result)
        //如果不是 => 下班打卡並計算是否超過9小時  (8小時上班+中午休1小)
        //todo 如果超過10個小時開始算加班(10小 = 上班9小+30分鐘法定休息時間+30分鐘加班時間)
      } else {
        let status = 0
        const workTime = moment.tz(presentData.work, timezone)
        const offWorkTime = moment.tz(time, timezone)
        const duration = offWorkTime.diff(workTime, 'minutes')
        if (duration >= 540) {
          status = 1
        }
        const updatePresent = await presentData.update({
          offWork: time,
          status: status
        })
        const result = JSON.stringify({
          PunchRecord: postPunchRecord, PresentRecord: updatePresent
        })
        return cb(null, result)
      }
    } catch (err) {
      cb(err)
    }
  },
}
module.exports = recordServices