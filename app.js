if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const passport = require('./config/passport')
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())

require('./routes')(app)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app