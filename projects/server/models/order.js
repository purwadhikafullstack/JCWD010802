'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.status)
      order.belongsTo(models.user)
      order.belongsTo(models.address)
      order.belongsTo(models.cart)
      order.hasMany(models.orderItem)
      order.belongsTo(models.warehouse)
    }
  }
  order.init({
    totalPrice: DataTypes.INTEGER,
    paymentProof: DataTypes.STRING,
    shippingMethod: DataTypes.STRING,
    shippingCost: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};