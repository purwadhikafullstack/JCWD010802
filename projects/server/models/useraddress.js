'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userAddress.belongsTo(models.address)
      userAddress.belongsTo(models.user)
    }
  }
  userAddress.init({
    isPrimary: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'userAddress',
    timestamps:false
  });
  return userAddress;
};