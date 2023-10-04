'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      journal.belongsTo(models.stock)
      journal.belongsTo(models.order)
      journal.belongsTo(models.requestHistory)

    }
  }
  journal.init({
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'journal',
  });
  return journal;
};