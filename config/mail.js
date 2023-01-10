const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'super60622@gmail.com',
    pass: 'sbkevbvdxuatvujz'
  },
  tls: {

    rejectUnauthorized: false
  }
})

const sendMailer = {

  sendBanned: (to, userName) => {
    const options = {
      // 寄件者
      from: 'super60622@gmail.com',
      // 收件者
      to,
      // 主旨
      subject: '帳號封鎖紀錄', // Subject line

      // 嵌入 html 的內文
      html: `<p>${userName}被封鎖了</p>`
    }

    // 發送信件方法
    transporter.sendMail(options, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('訊息發送: ' + info.response)
      }
    })
  }
}

module.exports = sendMailer
