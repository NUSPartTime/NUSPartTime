'use strict';
module.exports = function(sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    userId: DataTypes.BIGINT,
    jobId: DataTypes.INT,
    status: DataTypes.INT,
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