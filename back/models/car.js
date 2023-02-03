'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Reservation, CarDetails }) {
      this.hasMany(Reservation, { foreignKey: 'carId', onDelete: 'cascade', onUpdate: 'cascade', hooks: true });
      this.belongsTo(CarDetails, { foreignKey: 'detailsId' });
    }
  };
  Car.init({
    manufacturer: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING,
    pricePerDay: DataTypes.FLOAT,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};