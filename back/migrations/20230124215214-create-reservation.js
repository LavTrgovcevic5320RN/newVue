'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATEONLY
      },
      endDate: {
        type: Sequelize.DATEONLY
      },
      pricePerDay: {
        type: Sequelize.FLOAT
      },
      carId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cars',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      bicycleId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Bicycles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      scooterId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Scooters',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      motorcycleId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Motorcycles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservations');
  }
};