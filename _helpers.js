const moment = require('moment')
const fs = require('fs')

const timezone = 'Asia/Taipei'
const dateFormat = 'YYYY-MM-DD'
const monthFormat = 'YYYY-MM'
const yearFormat = 'YYYY'

function getUser (req) {
  return req.user
}

function getYear () {
  const now = new moment().utc().tz('Europe/London').tz(timezone)
  const year = now.format(yearFormat).toString()
  return year
}

function getMonth () {
  const now = new moment().utc().tz('Europe/London').tz(timezone)
  const month = now.format(monthFormat).toString()
  return month
}

function getToday () {
  const now = new moment().utc().tz('Europe/London').tz(timezone)
  const date = now.clone().subtract(5, 'hours').format(dateFormat)
  return date
}

function getYesterday () {
  const now = new moment().utc().tz('Europe/London').tz(timezone).subtract(1, 'days')
  const date = now.clone().subtract(5, 'hours').format(dateFormat)
  return date
}
function getPreviosday () {
  const now = new moment().utc().tz('Europe/London').tz(timezone).subtract(1, 'days')
  const year = getYear()
  let date = now.clone().subtract(5, 'hours').format(dateFormat)
  const data = fs.readFileSync(`./config/${year}.json`, 'utf8')
  const offWorkDays = JSON.parse(data)
  while (offWorkDays.find((x) => x.date === date)) {
    date = moment(date).subtract(1, 'days').format(dateFormat)
    console.log(date)
  }
  return date
}

function getWorkOffDay () {
  const year = getYear()
  const month = getMonth()

  const data = fs.readFileSync(`./config/${year}.json`, 'utf8')
  const offWorkDays = JSON.parse(data)
  const days = offWorkDays.filter((x) => x.date.substring(0, 7) === month)
  console.log(days)
  return days
}

module.exports = {
  getUser,
  getYear,
  getMonth,
  getToday,
  getYesterday,
  getPreviosday,
  getWorkOffDay
}
