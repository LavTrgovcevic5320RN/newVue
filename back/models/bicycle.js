'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bicycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Reservation, BicycleDetails }) {
      this.hasMany(Reservation, { foreignKey: 'bicycleId', onDelete: 'cascade', onUpdate: 'cascade', hooks: true });
      this.belongsTo(BicycleDetails, { foreignKey: 'detailsId' });
    }
  }
  Bicycle.init({
    manufacturer: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING,
    pricePerDay: DataTypes.FLOAT,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Bicycle',
  });
  return Bicycle;
};