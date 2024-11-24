const express = require('express');
const { verifiedFunction } = require('./verifyJwtToken');
const { createShortUrl } = require('../controllers/urlController');
const router = express.Router();

router.post('/shorten', verifiedFunction([]), createShortUrl);

module.exports = router;
