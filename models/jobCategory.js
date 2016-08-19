'use strict';
module.exports = function(sequelize, DataTypes) {
  var JobCategory = sequelize.define('JobCategory', {

  }, {
    classMethods: {
      associate: function(models) {
        JobCategory.belongsTo(models.Category, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: 'categoryId'
        });
        JobCategory.belongsTo(models.Job, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        });
      }
    }
  });
  return JobCategory;
};