'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_managements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique:true
      },
      password: {
        type: Sequelize.STRING
      },
      url_photo: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique:true
      },
      address: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING,
        unique:true
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
    await queryInterface.dropTable('employee_managements');
  }
};