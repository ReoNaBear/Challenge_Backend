const express = require('express')
const router = express.Router()
const recordController = require('../controllers/record-controller')
const { authenticated, authenticatedUser } = require('../middleware/api-auth')

router.use(authenticated, authenticatedUser)

router.get('/month_record', recordController.getMonthRecord)
router.post('/punch_record', recordController.postPunchRecord)
router.post('/qrcode_punch_record', recordController.qrcodePunchRecord)

module.exports = router
