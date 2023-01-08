'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.PunchRecord, { foreignKey: 'userId' })
      User.hasMany(models.LoginRecord, { foreignKey: 'userId' })
      User.hasMany(models.PresentRecord, { foreignKey: 'userId', as: 'PresentRecords' })
      User.belongsTo(models.UserAuth, { foreignKey: 'userAuthId' })
    }
  }
  User.init({
    seqNo: DataTypes.INTEGER,
    userId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    userAuthId: DataTypes.UUID,
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    empNo: DataTypes.STRING,
    isBanned: DataTypes.TINYINT,
    isAdmin: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  return User;
};