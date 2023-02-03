'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BicycleDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bicycle }) {
      this.hasOne(Bicycle, { foreignKey: 'detailsId' });
    }
  }
  BicycleDetails.init({
    wheels: DataTypes.INTEGER,
    electric: DataTypes.STRING,
    seats: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BicycleDetails',
  });
  return BicycleDetails;
};