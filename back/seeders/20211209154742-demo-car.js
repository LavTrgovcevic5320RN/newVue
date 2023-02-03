'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cars', [
      {
        manufacturer: 'Car',
        model: '1',
        year: 2012,
        detailsId: 1,
        pricePerDay: 9.99,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Car',
        model: '2',
        year: 2013,
        detailsId: 5,
        pricePerDay: 9.19,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Car',
        model: '3',
        year: 2014,
        detailsId: 6,
        pricePerDay: 8.55,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Car',
        model: '4',
        year: 2015,
        detailsId: 3,
        pricePerDay: 12.89,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Car',
        model: '5',
        year: 2016,
        detailsId: 2,
        pricePerDay: 7.99,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Car',
        model: '6',
        year: 2017,
        detailsId: 7,
        pricePerDay: 17.77,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Car',
        model: '7',
        year: 2018,
        detailsId: 2,
        pricePerDay: 14.01,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Car',
        model: '8',
        year: 2019,
        detailsId: 8,
        pricePerDay: 18.55,
        image: 'Potrebno dodati',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cars', null, {});
  }
};
