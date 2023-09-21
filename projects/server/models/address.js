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
      address.hasOne(models.order)
    }
  }
  address.init({
    address: DataTypes.STRING,
    kota: DataTypes.INTEGER,
    nama_kota: DataTypes.STRING,
    provinsi: DataTypes.INTEGER,
    nama_provinsi: DataTypes.STRING,
    kode_pos: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};