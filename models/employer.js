'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employer = sequelize.define('Employer', {

  }, {
    classMethods: {
      associate: function(models) {
        Employer.belongsTo(models.User, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: 'id'
        });
      }
    }
  });
  return Employer;
};