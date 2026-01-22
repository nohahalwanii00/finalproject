const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appointmentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
    defaultValue: 'Pending'
  }
});

module.exports = Patient;