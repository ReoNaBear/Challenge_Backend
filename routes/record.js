const express = require('express')
const router = express.Router()
const recordController = require('../controllers/record-controller')
const { authenticated, authenticatedUser } = require('../middleware/api-auth')

router.use(authenticated, authenticatedUser)

router.post('/punch_record', recordController.postPunchRecord)


module.exports = router