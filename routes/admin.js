const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/api-auth')

router.use(authenticated, authenticatedAdmin)

router.get('/qrcode', adminController.getQRcode)


module.exports = router