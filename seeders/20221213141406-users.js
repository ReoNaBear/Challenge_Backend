'use strict';
const bcrypt = require('bcryptjs')
const crypto = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('UserAuths', [{
      seqNo: 1,
      account: 'admin',
      password: bcrypt.hashSync('tiadmin', bcrypt.genSaltSync(10), null),
      userAuthId: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: null
    }], {})
    await queryInterface.bulkInsert('UserAuths',
      Array.from({ length: 5 }).map((_, i) => ({
        seqNo: i + 2,
        account: `user${i + 1}`,
        password: bcrypt.hashSync('tiadmin', bcrypt.genSaltSync(10), null),
        userAuthId: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: null
      })), {})
    const userAuths = await queryInterface.sequelize.query(
      `SELECT seqNO,userAuthId FROM UserAuths ORDER BY seqNO ASC;`
    )
    const userAuthRows = userAuths[0]
    if (userAuthRows) {
      await queryInterface.bulkInsert('Users', [{
        seqNo: 1,
        userId: crypto.randomUUID(),
        userAuthId: userAuthRows[0].userAuthId,
        userName: 'admin',
        userEmail: 'admin@tiadmin-test.com.tw',
        empNo: 'TW000',
        isBanned: 0,
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: null
      }], {})
      await queryInterface.bulkInsert('Users', Array.from({ length: 5 }).map((_, i) => ({
        seqNo: i + 2,
        userId: crypto.randomUUID(),
        userAuthId: userAuthRows[i + 1].userAuthId,
        userName: `user${i + 1}`,
        userEmail: `user${i + 1}@tiadmin-test.com.tw`,
        empNo: `TW00${i + 1}`,
        isBanned: 0,
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: null
      })), {})
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('UserAuths', null, {})
    await queryInterface.bulkDelete('Users', null, {})
  }
};
