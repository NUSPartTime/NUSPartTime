'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Job', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER
        references: { 
          model: 'Company', 
          key: 'id' 
        }
      },
      title: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      salary: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      appicationDeadline: {
        type: Sequelize.DATE
      },
      deadline: {
        type: Sequelize.DATE
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

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Job');
  }
};
