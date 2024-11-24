const { DataTypes } = require('sequelize');
const { urlmgmtDB } = require('../config/config');

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
}, {
    tableName: 'urls',
    timestamps: true,
});

module.exports = Url;
