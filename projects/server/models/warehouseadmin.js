'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warehouseAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      warehouseAdmin.belongsTo(models.user)
      warehouseAdmin.belongsTo(models.warehouse)
    }
  }
  warehouseAdmin.init({
    tes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'warehouseAdmin',
    timestamps:false

  });
  return warehouseAdmin;
};