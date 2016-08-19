'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentJob = sequelize.define('StudentJob', {
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        StudentJob.belongsTo(models.Student, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: 'studentId'
        });
        StudentJob.belongsTo(models.Job, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: 'jobId'
        });
      }
    }
  });
  return StudentJob;
};