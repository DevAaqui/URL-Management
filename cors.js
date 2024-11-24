const cors = require('cors');

const corsOptions1 = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};

const allowlist = ['http://localhost:3000'];
const corsOptionsDelegate = function (req, callback) {
  console.log('inside cors - option delegate');
  console.log('Origin****', req.header('Origin'));
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    console.log('Inside if');
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    console.log('Inside else');
    corsOptions = { origin: true }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
// cors(corsOptionsDelegate)
module.exports = (app) => {
  app.use(cors(corsOptionsDelegate));
};
