/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');

const app = express();

app.options('*', cors());
require('./cors')(app);

const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');

const path = require('path');
const bodyParser = require('body-parser');

//Import routes here
const authRoutes = require('./routes/authRoute');
const urlRoutes = require('./routes/urlRoute');

const { urlmgmtDB } = require('./config/config');

app.use(morgan('tiny'));

urlmgmtDB;

const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//Routes middleware

app.use('/home', () => {
  console.log('Inside home');
});
app.use('/auth', authRoutes);
app.use('/api', urlRoutes);

module.exports = app.listen(port, () =>
  console.log(`Server up and running on ${port}`)
);
