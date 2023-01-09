const adminServices = require('../services/admin-services')
const recordServices = require('../services/record-services')
const adminController = {
  // 取得打卡QR code
  getQRcode: (req, res, next) => {
    adminServices.getQRcode(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },
  getUsers: (req, res, next) => {
    adminServices.getUsers(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },
  getMonthRecord: (req, res, next) => {
    recordServices.getMonthRecord(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },
  updateBannedStatus: (req, res, next) => {
    adminServices.updateBannedStatus(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },
  updatePunchStatus: (req, res, next) => {
    adminServices.updatePunchStatus(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  }
}
module.exports = adminController
