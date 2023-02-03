'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MotorcycleDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Motorcycle }) {
      this.hasOne(Motorcycle, { foreignKey: 'detailsId' });
    }
  }
  MotorcycleDetails.init({
    wheels: DataTypes.INTEGER,
    seats: DataTypes.INTEGER,
    maxSpeed: DataTypes.INTEGER,
    maxWeight: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MotorcycleDetails',
  });
  return MotorcycleDetails;
};