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
  // Custom key generator for proper IP detection behind proxy
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
  },
  // Skip successful requests from rate limiting count (optional)
  skipSuccessfulRequests: false,
  // Skip failed requests from rate limiting count (optional)
  skipFailedRequests: false,
  // Skip preflight requests from rate limiting
  skip: (req) => {
    return req.method === 'OPTIONS';
  },
});

module.exports = limiter;
