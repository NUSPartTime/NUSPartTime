'use strict';
module.exports = function(sequelize, DataTypes) {
  var Interest = sequelize.define('Interest', {
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Interest.belongsTo(models.Student, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Interest.belongsTo(models.Job, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Interest;
};