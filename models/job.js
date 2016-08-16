'use strict';
module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    company_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Job.belongsTo(models.Company, {
          onDelete: "CASCADE",
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
