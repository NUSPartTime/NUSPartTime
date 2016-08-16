'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    matric: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Student.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: 'id'
        });
      }
    }
  });
  return Student;
};