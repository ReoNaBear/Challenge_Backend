const passport = require('../config/passport')
const helpers = require('../_helpers')


// 登入驗證
const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ status: 'error', message: '請先登入' })
    req.user = user
    next()
  })(req, res, next)
}

//避免admin登入前台
const authenticatedUser = (req, res, next) => {
  if (helpers.getUser(req)) {
    if (helpers.getUser(req).isAdmin === 0) { return next() }
    return res.status(403).json({ message: '請切換成一般帳戶' })
  } else {
    return res.status(401).json({ message: '請先登入' })
  }
}

//避免user登入後台
const authenticatedAdmin = (req, res, next) => {
  if (helpers.getUser(req)) {
    if (helpers.getUser(req).isAdmin === 1) { return next() }
    return res.status(403).json({ message: '管理者才能使用此功能' })
  } else {
    return res.status(401).json({ message: '請先登入管理者帳戶' })
  }
}

module.exports = {
  authenticated, authenticatedUser, authenticatedAdmin
}
