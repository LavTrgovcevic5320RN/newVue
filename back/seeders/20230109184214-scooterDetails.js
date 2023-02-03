'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ScooterDetails', [
      {
        maxWeight: 110,
        electric: true,
        length: 210,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        maxWeight: 120,
        electric: true,
        length: 220,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        maxWeight: 130,
        electric: true,
        length: 230,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        maxWeight: 140,
        electric: true,
        length: 240,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        maxWeight: 150,
        electric: true,
        length: 250,
        createdAt: new Date(),
        updatedAt: new Date()
      } 
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ScooterDetails', null, {});
  }
};
