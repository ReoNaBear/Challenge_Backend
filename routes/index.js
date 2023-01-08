const userController = require('../controllers/user-controller')
const user = require('./user')
const record = require('./record')
const admin = require('./admin')
const date = require('./date')

const { apiErrorHandler } = require('../middleware/error-handler')

module.exports = (app) => {
  app.post('/api/signin', userController.signIn)
  app.use('/api/records', record)
  app.use('/api/users', user)
  app.use('/api/date', date)
  app.use('/api/admins', admin)
  app.use('/', apiErrorHandler)
}
