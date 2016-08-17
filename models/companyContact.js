'use strict';
module.exports = function(sequelize, DataTypes) {
  var CompanyContact = sequelize.define('CompanyContact', {

  }, {
    classMethods: {
      associate: function(models) {
        CompanyContact.belongsTo(models.Employer, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: 'employerId'
        });
        CompanyContact.belongsTo(models.Company, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: 'companyId'
        });
      }
    }
  });
  return CompanyContact;
};