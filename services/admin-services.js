const { User, QRcodeAuth, PresentRecord} = require('../models')
const helper = require('../_helpers')
const crypto = require("crypto");
const sequelize = require("sequelize");
const e = require('express');

const adminServices = {
  getQRcode: async (req, cb) => {
    try {
      //現在沒有其他公司 先固定為TW
      const companyCode = "TW"
      const companyQRcode = await QRcodeAuth.findOne({ where: { companyCode: companyCode }})
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
  getUsers: async (req, cb) => {
    try {
      const date = helper.getYesterday()
      const users = await User.findAll({
        raw: true,
        nest: true,
        attributes: {
          exclude: [
            'userAuthId',
            'createdAt',
            'updatedAt'
          ],
        },
        order: [
          ['seqNo', 'ASC'],
        ]
      })
      const records = await PresentRecord.findAll({
        raw: true,
        nest: true,
        where: { date: date}
      })
      for (let i = 0; i < users.length; i++) {
        const record = records.find(x => x.userId === users[i].userId)
        if(!record){
          users[i].presentRecord = null
        } else {
          users[i].presentRecord= record
        }
      }
      const result = users.map(user => JSON.parse(JSON.stringify(user)))
      console.log(result);
      return cb(null, result)
    } catch (err) {
      cb(err)
    }
  },
}
module.exports = adminServices