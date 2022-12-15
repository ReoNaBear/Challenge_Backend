'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LoginRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LoginRecord.belongsTo(models.User, {
        through: models.LoginRecord,
        foreignKey: 'userId',
        as: 'LoginRecords'
      })
    }
  }
  LoginRecord.init({
    userId: DataTypes.UUID,
    isLogin: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'LoginRecord',
  });
  return LoginRecord;
};