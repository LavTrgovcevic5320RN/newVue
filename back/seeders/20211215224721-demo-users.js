'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
    {
      email: 'lav@gmail.com',
      password: 'lav',
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'pera@gmail.com',
      password: 'pera',
      role: 'Moderator',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'marko@gmail.com',
      password: 'marko',
      role: 'Moderator',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'ivan@gmail.com',
      password: 'ivan',
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'ana@gmail.com',
      password: 'ana',
      role: 'Moderator',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
