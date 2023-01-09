const userServices = require('../services/user-services')
const userController = {
  // 使用者登入
  signIn: (req, res, next) => {
    userServices.signIn(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },
  // 取得目前使用者
  getCurrentUser: (req, res, next) => {
    userServices.getCurrentUser(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },
  getCurrentPunchData: (req, res, next) => {
    userServices.getCurrentPunchData(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },
  // 使用者修改密碼
  putPassword: (req, res, next) => {
    userServices.putPassword(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  }
}
module.exports = userController
