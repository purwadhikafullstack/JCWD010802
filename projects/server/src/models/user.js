'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.userAddress)
      user.belongsTo(models.role)
      user.hasOne(models.warehouseAdmin)
      user.hasMany(models.cart)
      user.hasMany(models.order)
      user.hasMany(models.wishlist)
      user.hasOne(models.token)
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING},
    password: DataTypes.STRING,
    profileImg: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false

    }
  }, {
    sequelize,
    modelName: 'user'
  });
  return user;
};