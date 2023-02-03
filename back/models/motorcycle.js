'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Motorcycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Reservation, MotorcycleDetails}) {
      this.hasMany(Reservation, { foreignKey: 'motorcycleId', onDelete: 'cascade', onUpdate: 'cascade', hooks: true });
      this.belongsTo(MotorcycleDetails, { foreignKey: 'detailsId' });
    }
  }
  Motorcycle.init({
    manufacturer: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING,
    pricePerDay: DataTypes.FLOAT,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Motorcycle',
  });
  return Motorcycle;
};