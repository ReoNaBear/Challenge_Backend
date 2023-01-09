const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { authenticated, authenticatedUser } = require('../middleware/api-auth')

router.use(authenticated)
router.get('/current_user', userController.getCurrentUser)
router.use(authenticatedUser)
router.get('/current_punch_data', userController.getCurrentPunchData)
router.put('/password', userController.putPassword)

module.exports = router
