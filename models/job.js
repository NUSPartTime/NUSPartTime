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
<<<<<<< HEAD
          onUpdate: "CASCADE",
=======
>>>>>>> c5cb7f4260dfd44f49c8909e939fa4f38a46a893
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Job;
};
