'use strict';
const {
  Model
} = require('sequelize');
const wishlist = require('./wishlist');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.category)
      product.hasMany(models.stock)
      product.hasOne(models.orderItem)
      product.hasOne(models.wishlist)
    }
  }
  product.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    productImg: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};