const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { authenticated, authenticatedUser } = require('../middleware/api-auth')

router.use(authenticated)
router.get('/current_user', userController.getCurrentUser)

router.use(authenticatedUser)
router.put('/account/password', userController.putPassword)



module.exports = router