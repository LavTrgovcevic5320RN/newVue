'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MotorcycleDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wheels: {
        type: Sequelize.INTEGER
      },
      seats: {
        type: Sequelize.INTEGER
      },
      maxSpeed: {
        type: Sequelize.INTEGER
      },
      maxWeight: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MotorcycleDetails');
  }
};