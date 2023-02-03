'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Car, Bicycle, Scooter, Motorcycle, User }) {
        this.belongsTo(Car, { foreignKey: 'carId' , allowNull: true });
        this.belongsTo(Bicycle, { foreignKey: 'bicycleId' , allowNull: true });
        this.belongsTo(Scooter, { foreignKey: 'scooterId' , allowNull: true });
        this.belongsTo(Motorcycle, { foreignKey: 'motorcycleId' , allowNull: true });
        this.belongsTo(User, { foreignKey: 'userId' });
    }
  };
  Reservation.init({
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};