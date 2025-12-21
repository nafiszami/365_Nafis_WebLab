'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // no associations for now
    }
  }

  Task.init(
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',   
      timestamps: true,    
      underscored: true,   
    }
  );

  return Task;
};
