const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const { User, UserAuth } = require('../models')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'account',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, account, password, cb) => {
        UserAuth.findOne({ where: { account } }).then(userAuth => {
          if (!userAuth)
            return cb(
              null,
              false,
              req.flash('error_messages', 'Incorrect Account or Password!')
            )
          if (!bcrypt.compareSync(password, userAuth.password))
            return cb(null, false, req.flash('error_messages', 'Incorrect Account or Password!'))
          return cb(null, userAuth)
        })
      }
    )
  )

  let jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
  jwtOptions.secretOrKey = process.env.JWT_SECRET

  passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const userAuth = await UserAuth.findByPk(jwtPayload.userAuthId)
      if (!userAuth) {
        return done(null, false)
      }
      const user = await User.findOne(jwtPayload.userAuthId)
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    } catch (err) {
      console.warn(err)
    }
  }))



  passport.serializeUser((userAuth, cb) => {
    cb(null, userAuth.userAuthId)
  })
  passport.deserializeUser((userAuthId, cb) => {
    UserAuth.findByPk(userAuthId, {
      include: [

      ]
    }).then(userAuth => {
      userAuth = userAuth.toJSON()
      return cb(null, userAuth)
    })
  })
}
module.exports = passport