'use strict';
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.TEXT,
    registerDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return Company;
};