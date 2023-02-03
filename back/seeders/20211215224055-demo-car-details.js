'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CarDetails', [
      {
        doors: 5,
        fuel: 'Petrol',
        transmission: 'Automatic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        doors: 5,
        fuel: 'Diesel',
        transmission: 'Manual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        doors: 3,
        fuel: 'Petrol',
        transmission: 'Automatic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        doors: 3,
        fuel: 'Diesel',
        transmission: 'Automatic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        doors: 5,
        fuel: 'Diesel',
        transmission: 'Automatic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        doors: 3,
        fuel: 'Petrol',
        transmission: 'Manual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        doors: 5,
        fuel: 'Petrol',
        transmission: 'Manual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        doors: 5,
        fuel: 'Hybrid',
        transmission: 'Automatic',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CarDetails', null, {});
  }
};
