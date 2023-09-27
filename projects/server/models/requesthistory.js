'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requestHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      requestHistory.belongsTo(models.stock)
      
    }
  }
  requestHistory.init({
    status: DataTypes.STRING,
    from: DataTypes.STRING,
    from_name: DataTypes.STRING,
    to: DataTypes.STRING,
    to_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'requestHistory',
  });
  return requestHistory;
};