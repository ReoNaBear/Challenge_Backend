'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserAuths', {
      userAuthId: {
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
      account: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserAuths');
  }
};