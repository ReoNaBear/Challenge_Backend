const userController = require('../controllers/user-controller')


module.exports = (app) => {
  app.post('/api/signin', userController.signIn) // login user和admin共用 沒有前綴 所以放這
  app.get('/', (req, res) => {
    res.send(`This is my first Express Web App`)
  })
}
