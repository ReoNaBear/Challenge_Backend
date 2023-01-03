const adminServices = require('../services/admin-services')
const adminController = {
  //取得打卡QR code
  getQRcode: (req, res, next) => {
    adminServices.getQRcode(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },
}
module.exports = adminController