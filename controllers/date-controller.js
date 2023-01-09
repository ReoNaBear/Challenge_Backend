const dateServices = require('../services/date-services')
const dateController = {
  // 取得打卡QR code
  updateDateData: (req, res, next) => {
    dateServices.updateDateData(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  }
}
module.exports = dateController
