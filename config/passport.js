const passport = require('passport')
const passportJWT = require('passport-jwt')
const { User, UserAuth } = require('../models')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET
passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    console.log(jwtPayload.userAuthId);
    const userAuth = await UserAuth.findByPk(jwtPayload.userAuthId)
    if (!userAuth) {
      return done(null, false)
    }
    const user = await User.findOne({ where: { userAuthId: jwtPayload.userAuthId } })
    if (!user) {
      return done(null, false)
    }
    console.log(user);
    done(null, user)
  } catch (err) {
    console.warn(err)
  }
}))



passport.serializeUser((user, cb) => {
  cb(null, user.userAuthId)
})
passport.deserializeUser((userAuthId, cb) => {
  User.findByPk(userAuthId, {
    include: [

    ]
  }).then(userAuth => {
    userAuth = userAuth.toJSON()
    return cb(null, userAuth)
  })
})
module.exports = passport