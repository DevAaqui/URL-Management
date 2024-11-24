const express = require('express');
const { verifiedFunction } = require('./verifyJwtToken');
const { createShortUrl, updateShortUrl, deleteShortUrl } = require('../controllers/urlController');
const router = express.Router();

router.post('/shorten', verifiedFunction([]), createShortUrl);
router.put('/update/:id', verifiedFunction([]), updateShortUrl);
router.delete('/delete/:id', verifiedFunction([]), deleteShortUrl);
module.exports = router;
