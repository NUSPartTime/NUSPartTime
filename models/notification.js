'use strict';
module.exports = function(sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    status: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Notification.belongsTo(models.User, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: 'userId'
        });
        Notification.belongsTo(models.Job, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: 'jobId'
        });
      }
    }
  });
  return Notification;
};