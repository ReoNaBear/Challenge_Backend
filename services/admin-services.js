const { User, UserAuth, QRcodeAuth} = require('../models')
const helper = require('../_helpers')
const crypto = require("crypto");

const adminServices = {
  getQRcode: async (req, cb) => {
    try {
      //現在沒有其他公司 先固定為TW
      const companyCode = "TW"
      const companyQRcode = await QRcodeAuth.findOne({ where: { companyCode: companyCode }})
      console.log(companyQRcode);
      if( !companyQRcode ) {
        const newQRcodeAuth = await QRcodeAuth.create({
          companyCode: companyCode,
          secretCode: crypto.randomUUID(),
        })
        return cb(null, { QRcodeSecret: newQRcodeAuth.secretCode })
      }
      return cb(null, { QRcodeSecret: companyQRcode.secretCode })
    } catch (err) {
      cb(err)
    }
  },
}
module.exports = adminServices