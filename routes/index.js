const userController = require('../controllers/user-controller')
const user = require('./user')
const record = require('./record')
const { authenticated, authenticatedUser } = require('../middleware/api-auth')

const { apiErrorHandler } = require('../middleware/error-handler')

module.exports = (app) => {
  app.post('/api/signin', userController.signIn) // login user和admin共用 沒有前綴 所以放這
  app.use('/api/records', record)
  app.use('/api/users', user)
  app.use('/', apiErrorHandler)
}
