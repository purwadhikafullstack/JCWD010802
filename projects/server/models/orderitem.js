'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderItem.belongsTo(models.order)
      orderItem.belongsTo(models.product)
    }
  }
  orderItem.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orderItem',
  });
  return orderItem;
};