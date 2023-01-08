const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
const dateServices = {
  updateDateData: async (req, cb) => {
    try {
      const url = "https://data.ntpc.gov.tw/api/datasets/308DCD75-6434-45BC-A95F-584DA4FED251/json?page=0&size=10000"
      const response = await axios.get(url)
      const data = response.data
      const timezone = "Asia/Taipei"
      const now = new moment().utc().tz("Europe/London").tz(timezone);
      const yearFormat = "YYYY"
      let year = now.format(yearFormat).toString()
      let saveData = []
      for (let i = 0; i < data.length; i++) {
        if(data[i].date.substring(0,4) === year){
          data[i].date = data[i].date.replaceAll("/", "-")
          saveData.push(data[i])
        }
      }
      console.log(saveData);
      saveData = JSON.stringify(saveData)

      fs.writeFile(`./config/${year}.json`, saveData, function (err) {
        if (err){
          console.log(err);
          throw new Error('Date Update Error! Please contact your administrator')
        } else {
          console.log('Write operation complete.')
        }
      });
    } catch (err) {
      cb(err)
    }
  },
}
module.exports = dateServices