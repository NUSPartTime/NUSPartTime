'use strict';
module.exports = function(sequelize, DataTypes) {
  var Interest = sequelize.define('Interest', {
    student_id: DataTypes.INTEGER,
    job_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Interest;
};