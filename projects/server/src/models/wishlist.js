'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      wishlist.belongsTo(models.user)
      wishlist.belongsTo(models.product)
    }
  }
  wishlist.init({
  }, {
    sequelize,
    modelName: 'wishlist',
  });
  return wishlist;
};