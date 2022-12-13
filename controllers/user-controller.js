const userServices = require('../services/user-services')
const userController = {
  signIn: (req, res, next) => {
    userServices.signIn(req, (err, data) =>
      err ? next(err) : res.status(200).json({ status: 'success', data }))
  },


}
module.exports = userController