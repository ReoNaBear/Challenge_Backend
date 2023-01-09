'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PresentRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  PresentRecord.init({
    userId: DataTypes.UUID,
    date: DataTypes.STRING,
    work: DataTypes.STRING,
    offWork: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'PresentRecord',
    tableName: 'PresentRecords'
  })
  return PresentRecord
}
