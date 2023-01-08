const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/api-auth')

router.use(authenticated, authenticatedAdmin)

router.get('/qrcode', adminController.getQRcode)
router.get('/users', adminController.getUsers)
router.put('/update_banned_status', adminController.updateBannedStatus)
router.put('/update_punch_status', adminController.updatePunchStatus)


module.exports = router