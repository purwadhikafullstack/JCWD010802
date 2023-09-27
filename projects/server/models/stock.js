'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stock.belongsTo(models.product)
      stock.belongsTo(models.warehouse)
      stock.hasOne(models.journal)
      stock.hasMany(models.requestHistory)
      stock.hasMany(models.stockMutation)

    }
  }
  stock.init({
    quantity: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'stock',
  });
  return stock;
};