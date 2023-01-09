'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID
      },
      seqNo: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER
      },
      userAuthId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userEmail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      empNo: {
        type: Sequelize.STRING
      },
      isBanned: {
        defaultValue: '0',
        type: Sequelize.TINYINT
      },
      isAdmin: {
        defaultValue: '0',
        type: Sequelize.TINYINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
}
