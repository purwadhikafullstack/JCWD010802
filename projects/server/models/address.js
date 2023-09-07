'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      address.hasOne(models.userAddress)
    }
  }
  address.init({
    address: DataTypes.STRING,
    kota: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kode_pos: DataTypes.STRING,
    lat: DataTypes.STRING,
    lgt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'address',
    timestamps:false
  });
  return address;
};