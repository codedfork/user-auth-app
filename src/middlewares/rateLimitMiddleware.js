// rateLimiter.js
const rateLimit = require('express-rate-limit');
const messages = require('../lang/messages');

// Rate limiting configuration
limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 100, // 100 requests per minute with each IP
  message: messages.errors.tooManyRequests,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;
