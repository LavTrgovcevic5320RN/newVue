'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BicycleDetails', [
      {
        wheels: 2,
        electric: "true",
        seats: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        wheels: 3,
        electric: "true",
        seats: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        wheels: 3,
        electric: "false",
        seats: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        wheels: 4,
        electric: "false",
        seats: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        wheels: 2,
        electric: "false",
        seats: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BicycleDetails', null, {});
  }
};
