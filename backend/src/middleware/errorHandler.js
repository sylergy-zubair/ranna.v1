const CONSTANTS = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(CONSTANTS.STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Validation Error',
      details: errors
    });
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    return res.status(CONSTANTS.STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Invalid ID format'
    });
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(CONSTANTS.STATUS.BAD_REQUEST).json({
      success: false,
      error: `${field} already exists`
    });
  }

  // Default server error
  res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
};

const notFound = (req, res) => {
  res.status(CONSTANTS.STATUS.NOT_FOUND).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
};

module.exports = { errorHandler, notFound };
