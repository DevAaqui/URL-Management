const express = require('express');
const { verifiedFunction } = require('./verifyJwtToken');
const { createShortUrl, updateShortUrl, deleteShortUrl, getShortUrls, redirectShortUrl } = require('../controllers/urlController');
const { getUrlAnalytics } = require('../controllers/analyticsController');
const createUrlRateLimiter = require('./rateLimiterMiddleware');
const router = express.Router();

router.post('/shorten', verifiedFunction([]), createUrlRateLimiter, createShortUrl);
router.put('/update/:id', verifiedFunction([]), updateShortUrl);
router.delete('/delete/:id', verifiedFunction([]), deleteShortUrl);
router.get('/retrieve', verifiedFunction([]), getShortUrls);
router.get('/:alias', verifiedFunction([]), redirectShortUrl);
router.get('/:id/analytics', verifiedFunction([]), getUrlAnalytics);

module.exports = router;
