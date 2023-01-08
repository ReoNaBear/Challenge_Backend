const express = require('express')
const router = express.Router()
const dateController = require('../controllers/date-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/api-auth')

router.use(authenticated, authenticatedAdmin)

router.get('/update', dateController.updateDateData)


module.exports = router