'use strict';
module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    title: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    applicationDeadline: DataTypes.DATE,
    deadline: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Job.belongsTo(models.Company, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: 'companyId'
        });
        Job.hasMany(models.JobCategory);
      }
    }
  });
  return Job;
};
