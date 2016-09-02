'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    matric: DataTypes.STRING,
    resume: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Student.belongsTo(models.User, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: 'id'
        });
      }
    }
  });
  return Student;
};