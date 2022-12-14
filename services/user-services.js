const { User, UserAuth } = require('../models')
const bcrypt = require('bcryptjs')
const helper = require('../_helpers')
const jwt = require('jsonwebtoken')
const userServices = {
  signIn: async (req, cb) => {
    try {
      let result = {}
      const { account, password } = req.body
      if (!account || !password) {
        throw new Error('All fields are required!')
      }
      const userAuth = await UserAuth.findOne({ where: { account: account } })
      console.log(userAuth);
      if (!userAuth) {
        throw new Error('User not found!')
      } else if (!bcrypt.compareSync(password, userAuth.password)) {
        throw new Error('Incorrect Account or Password!')
      } else {
        const user = await User.findOne({ where: { userAuthId: userAuth.userAuthId }, attributes: { exclude: ['userAuthId', 'seqNo', 'createdAt', 'updateAt'] } },)
        result = user.toJSON()
      }
      if (result) {
        const payload = { userAuthId: userAuth.userAuthId }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
        return cb(null, { token, user: result })
      }
    } catch (err) {
      return cb(err)
    }
  },
  putPassword: async (req, cb) => {
    try {
      const userId = helper.getUser(req).userId
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