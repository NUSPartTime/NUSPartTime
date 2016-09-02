'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Students', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        references: 'Users',
        referenceKey: 'id'
      },
      matric: {
        type: Sequelize.STRING
      },
      resume: {
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Students');
  }
};
