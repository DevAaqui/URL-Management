const { DataTypes } = require('sequelize');
const { urlmgmtDB } = require('../config/config');
const UrlAccessLog = require('./urlAccessLog');

const Url = urlmgmtDB.define('Url', {
    originalUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    expirationStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    clickCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: 'urls',
    timestamps: true,
});

Url.hasMany(UrlAccessLog, { 
    foreignKey: 'urlId', 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE' 
  });
  
  UrlAccessLog.belongsTo(Url, { 
    foreignKey: 'urlId', 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE' 
  });

module.exports = Url;
