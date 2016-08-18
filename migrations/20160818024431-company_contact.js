'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('CompanyContact', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employer_id: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Employer', 
          key: 'id' 
        }
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Company', 
          key: 'id' 
        }
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
    return queryInterface.dropTable('CompanyContact');
  }
};
