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
      if (!userAuth) {
        throw new Error('User not found!')
      } else if (!bcrypt.compareSync(password, userAuth.password)) {
        throw new Error('Incorrect Account or Password!')
      } else {
        const user = await User.findOne({ where: { userAuthId: userAuth.userAuthId } })
        result = user.toJSON()
      }
      if (result) {
        const payload = { userAuthId: userAuth.userAuthId }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
        delete result[password, 'userAuthId', 'seqNo']
        return cb(null, { token, user: result })
      }
    } catch (err) {
      return cb(err)
    }
  },

}
module.exports = userServices