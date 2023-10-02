'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      warehouse.belongsTo(models.address)
      warehouse.hasOne(models.stock)
      warehouse.hasMany(models.order)
    }
  }
  warehouse.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    isDeleted : {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'warehouse',

  });
  return warehouse;
};