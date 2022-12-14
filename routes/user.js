const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { authenticated, authenticatedUser } = require('../middleware/api-auth')

router.use(authenticated, authenticatedUser)

router.put('/account/password', userController.putPassword)

module.exports = router