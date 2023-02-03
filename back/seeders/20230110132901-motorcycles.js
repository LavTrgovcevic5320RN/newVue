'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Motorcycles', [
      {
        manufacturer: 'Motorcycle',
        model: '1',
        year: 2012,
        detailsId: 1,
        pricePerDay: 9.99,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Motorcycle',
        model: '2',
        year: 2013,
        detailsId: 5,
        pricePerDay: 9.19,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Motorcycle',
        model: '3',
        year: 2009,
        detailsId: 6,
        pricePerDay: 8.55,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Motorcycle',
        model: '4',
        year: 2016,
        detailsId: 3,
        pricePerDay: 12.89,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Motorcycle',
        model: '5',
        year: 2011,
        detailsId: 2,
        pricePerDay: 7.99,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Motorcycle',
        model: '6',
        year: 2016,
        detailsId: 7,
        pricePerDay: 17.77,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Motorcycles', null, {});
  }
};
