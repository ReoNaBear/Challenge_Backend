const recordServices = require('../services/record-services')
const recordController = {
  //使用者打卡
  postPunchRecord: (req, res, next) => {
    recordServices.postPunchRecord(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },
  qrcodePunchRecord: (req, res, next) => {
    recordServices.qrcodePunchRecord(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },
}
module.exports = recordController