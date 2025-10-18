const rateLimit = require('express-rate-limit');
const CONSTANTS = require('../utils/constants');

const limiter = rateLimit({
  windowMs: CONSTANTS.RATE_LIMITS.WINDOW_MS,
  max: CONSTANTS.RATE_LIMITS.MAX_REQUESTS,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.round(CONSTANTS.RATE_LIMITS.WINDOW_MS / 1000) + ' seconds'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
