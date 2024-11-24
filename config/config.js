/* eslint-disable no-undef */
const Sequelize = require('sequelize');
// const chalk = require('chalk');

const urlmgmtDB = new Sequelize(process.env.URL_PROJECT_DB, process.env.DB_USERNAME, process.env.DB_PASSWORD, { host: process.env.DB_HOST, dialect: 'mysql', logging: false });

const urlmgmtDBFn = async()=> {
    try{
        await urlmgmtDB.authenticate();
        console.log('Work Order Sequelize connection has been established successfully');
    }
    catch(err){
        console.error('Unable to connect to database', err);
    }
};

urlmgmtDBFn();

module.exports = {
    urlmgmtDB,
};
