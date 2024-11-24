const express = require('express');
const { verifiedFunction } = require('./verifyJwtToken');
const { createShortUrl, updateShortUrl } = require('../controllers/urlController');
const router = express.Router();

router.post('/shorten', verifiedFunction([]), createShortUrl);
router.put('/update/:id', verifiedFunction([]), updateShortUrl);

module.exports = router;
