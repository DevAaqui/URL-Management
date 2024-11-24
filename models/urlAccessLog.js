const { DataTypes } = require('sequelize');
const { urlmgmtDB } = require('../config/config');

const UrlAccessLog = urlmgmtDB.define('UrlAccessLogs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  urlId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'urls',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'UrlAccessLogs',
  timestamps: true,
});

module.exports = UrlAccessLog;
