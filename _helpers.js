const moment = require('moment');
const fs = require('fs');

const timezone = "Asia/Taipei"
const dateFormat = "YYYY-MM-DD"
const yearFormat = "YYYY"

function getUser(req) {
  return req.user;
}

function getYear(){
  const now = new moment().utc().tz("Europe/London").tz(timezone);
  let year = now.format(yearFormat).toString()
  return year
}

function getToday(){
  const now = new moment().utc().tz("Europe/London").tz(timezone);
  let date = now.clone().subtract(5, "hours").format(dateFormat);
  return date
}

function getYesterday(){
  const now = new moment().utc().tz("Europe/London").tz(timezone).subtract(1, 'days');
  let date = now.clone().subtract(5, "hours").format(dateFormat);
  return date
}
function getPreviosday() {
  const now = new moment().utc().tz("Europe/London").tz(timezone).subtract(1, 'days');;
  let year = getYear()
  let date = now.clone().subtract(5, "hours").format(dateFormat);
  fs.readFile(`./config/${year}.json`, function (err, data) {
    if (err) throw err;
    let offWorkDays = JSON.parse(data)
    while (offWorkDays.find(x => x.date === date)){
      date = moment(date).subtract(1, 'days').format(dateFormat)
      console.log(date);
    }
  });
  
  return date
}
module.exports = {
  getUser,
  getYear,
  getToday,
  getYesterday,
  getPreviosday
};