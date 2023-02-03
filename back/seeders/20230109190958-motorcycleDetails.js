'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MotorcycleDetails', [
      {
        wheels: 2,
        seats: 2,
        maxSpeed: 60,
        maxWeight: 120,
        type: "Mountains",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        wheels: 2,
        seats: 1,
        maxSpeed: 70,
        maxWeight: 130,
        type: "Road",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        wheels: 2,
        seats: 1,
        maxSpeed: 80,
        maxWeight: 140,
        type: "Race Track",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        wheels: 2,
        seats: 1,
        maxSpeed: 90,
        maxWeight: 150,
        type: "Desert",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        wheels: 2,
        seats: 1,
        maxSpeed: 100,
        maxWeight: 160,
        type: "Mountains",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MotorcycleDetails', null, {});
  }
};


