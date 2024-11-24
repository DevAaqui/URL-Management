// models/User.js
const { DataTypes } = require('sequelize');
const {urlmgmtDB} = require('../config/config'); // Replace with your Sequelize instance

const User = urlmgmtDB.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures valid email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true, // Enable createdAt and updatedAt fields
});

module.exports = User;
