const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patient_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doctor_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
    defaultValue: 'Pending'
  }
}, {
  timestamps: true 
});

module.exports = Patient;