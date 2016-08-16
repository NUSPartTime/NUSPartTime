'use strict';
module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Job.belongsTo(models.Company, {
          onDelete: "CASCADE",
          foreignKey: 'companyId',
          onUpdate: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Job;
};
