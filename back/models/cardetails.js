'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Car }) {
      this.hasOne(Car, { foreignKey: 'detailsId' });
    }
  };
  CarDetails.init({
    doors: DataTypes.INTEGER,
    fuel: DataTypes.STRING,
    transmission: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CarDetails',
  });
  return CarDetails;
};