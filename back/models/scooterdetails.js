'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScooterDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Scooter }) {
      this.hasOne(Scooter, { foreignKey: 'detailsId' });
    }
  }
  ScooterDetails.init({
    maxWeight: DataTypes.INTEGER,
    electric: DataTypes.BOOLEAN,
    length: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ScooterDetails',
  });
  return ScooterDetails;
};