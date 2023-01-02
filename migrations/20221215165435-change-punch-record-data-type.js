'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('PunchRecords', 'date', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('PunchRecords', 'time', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('PunchRecords', 'date', {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.changeColumn('PunchRecords', 'time', {
      type: Sequelize.TIME(6),
    });
  }
};
