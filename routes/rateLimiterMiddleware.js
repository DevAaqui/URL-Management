const rateLimit = require('express-rate-limit');

// Rate limiter middleware for URL creation
const createUrlRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many URL creation requests. Please try again after an hour.",
  keyGenerator: (req) => req.user?.id || req.ip,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = createUrlRateLimiter;
