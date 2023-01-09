'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Locations', [{
      companyCode: 'TW',
      latitude: 24.165,
      longitude: 120.7118,
      createdAt: new Date(),
      updatedAt: null
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', null, {})
  }
}
