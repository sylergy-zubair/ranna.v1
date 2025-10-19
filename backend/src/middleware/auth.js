const CONSTANTS = require('../utils/constants');
const { formatResponse } = require('../utils/helpers');

// Simple token-based authentication middleware
const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(CONSTANTS.STATUS.UNAUTHORIZED).json(
        formatResponse(false, null, 'Access denied. No token provided.')
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Simple token validation (in production, use proper JWT verification)
    if (token === process.env.ADMIN_TOKEN || token === 'simple-admin-token') {
      next();
    } else {
      return res.status(CONSTANTS.STATUS.UNAUTHORIZED).json(
        formatResponse(false, null, 'Invalid or expired token.')
      );
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json(
      formatResponse(false, null, 'Authentication error', error.message)
    );
  }
};

module.exports = { authenticateAdmin };
