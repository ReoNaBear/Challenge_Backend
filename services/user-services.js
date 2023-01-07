const { User, UserAuth, LoginRecord, PresentRecord } = require('../models')
const bcrypt = require('bcryptjs')
const helper = require('../_helpers')
const jwt = require('jsonwebtoken')
const moment = require('moment');

const userServices = {
  signIn: async (req, cb) => {
    try {
      let result = {}
      const { account, password } = req.body
      if (!account || !password) {
        throw new Error('All fields are required!')
      }
      const userAuth = await UserAuth.findOne({ where: { account: account } })
      if (!userAuth) {
        throw new Error('User not found!')
      } else if (!bcrypt.compareSync(password, userAuth.password)) {
        const user = await User.findOne({ where: { userAuthId: userAuth.userAuthId }},)
        await LoginRecord.create({
          userId: user.userId,
          isLogin: 0,
          createdAt: Date.now()
        })
        const errorRecords = await LoginRecord.findAll({ where: { userId: user.userId, isLogin: 0 }})
        if( errorRecords.length >= 4 ){
          const banUser = await User.findOne({ where: { userAuthId: userAuth.userAuthId }})
          await banUser.update({
            isBanned: 1,
          })
          throw new Error('User has been Banned!')
        } else {
          throw new Error(`Incorrect Account or Password! Error Time ${errorRecords.length}`)
        }
      }
      const user = await User.findOne({ where: { userAuthId: userAuth.userAuthId }, attributes: { exclude: ['userAuthId', 'seqNo', 'createdAt', 'updateAt'] } },)
      if(user.isBanned === 1) throw new Error('User has been Banned!')
      result = user.toJSON()
      await LoginRecord.create({
        userId: user.userId,
        isLogin: 1,
        createdAt: Date.now()
      })
      if (result) {
        const payload = { userAuthId: userAuth.userAuthId }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
        const errorRecords = LoginRecord.findAll({ where: { userId: user.userId, isLogin: 0 }, attributes: ['id']})
        if (errorRecords){
          await LoginRecord.destroy({ where: { userId: user.userId, isLogin: 0 }})
        }
        return cb(null, { token, user: result })
      }
    } catch (err) {
      return cb(err)
    }
  },
  getCurrentUser: async (req, cb) => {
    try {
      const userId = helper.getUser(req).userId
      const userData = await User.findByPk(userId, {})
     
      const user = userData.toJSON()
      delete user.password
      return cb(null, user)
    } catch (err) {
      cb(err)
    }
  },
  getCurrentPunchData: async (req, cb) => {
    try {
      const userId = helper.getUser(req).userId
      const dateFormat = "YYYY-MM-DD"
      const timeFormat = "HH:mm:ss"
      const timezone = "Asia/Taipei"
      const now = new moment().utc().tz("Europe/London").tz(timezone);
      let date = now.clone().subtract(5, "hours").format(dateFormat);
      let presentData = await PresentRecord.findOne({ where: { userId: userId, date: date }})
      let duration = 0
      let workTime = null
      let offWorkTime = null
      if(presentData) {
        workTime = moment.tz(presentData.work, timezone)
        offWorkTime = moment.tz(presentData.offWork, timezone)
        duration = offWorkTime.diff(workTime, 'minutes')
        workTime = workTime.clone().format(timeFormat);
        offWorkTime = offWorkTime.clone().format(timeFormat);
      }
      if(presentData) {
      }
      const result = { workTime, offWorkTime, duration }
      return cb(null, result)
    } catch (err) {
      cb(err)
    }
  },
  putPassword: async (req, cb) => {
    try {
      const userAuthId = helper.getUser(req).userAuthId
      const { oldPassword, newPassword } = req.body
      if (!oldPassword || !newPassword) throw new Error('All fields are required!')
      if (newPassword && newPassword.length < 7) throw new Error('Passwords must have at least 7 characters')
      if (!userAuthId) throw new Error("User not found!")
      const userAuth = await UserAuth.findByPk(userAuthId, {})
      if (!userAuth) throw new Error("Auth not found!")
      const putPassword = await userAuth.update({
        password: await bcrypt.hash(newPassword, 10)
      })
      const result = putPassword.toJSON()
      return cb(null, result)
    } catch (err) {
      cb(err)
    }
  },
}
module.exports = userServices