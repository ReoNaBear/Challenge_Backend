'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PunchRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PunchRecord.belongsTo(models.User, {
        through: models.PunchRecord,
        foreignKey: 'userId',
        as: 'PunchRecords'
      })
    }
  }
  PunchRecord.init({
    userId: DataTypes.UUID,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME(6)
  }, {
    sequelize,
    modelName: 'PunchRecord',
  });
  return PunchRecord;
};