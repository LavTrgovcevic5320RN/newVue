'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scooter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Reservation, ScooterDetails}) {
      this.hasMany(Reservation, { foreignKey: 'scooterId', onDelete: 'cascade', onUpdate: 'cascade', hooks: true });
      this.belongsTo(ScooterDetails, { foreignKey: 'detailsId' });
    }
  }
  Scooter.init({
    manufacturer: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING,
    pricePerDay: DataTypes.FLOAT,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Scooter',
  });
  return Scooter;
};