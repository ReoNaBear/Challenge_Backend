'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserAuth.hasOne(models.User, { foreignKey: 'userAuthId' })
    }
  }
  UserAuth.init({
    seqNo: DataTypes.INTEGER,
    userAuthId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    account: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserAuth',
    tableName: 'UserAuths'
  });
  return UserAuth;
};