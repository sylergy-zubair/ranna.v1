const CONSTANTS = require('../utils/constants');

// Helper function to set CORS headers
const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://ranna-v1.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ];

  // Allow origin if it's in allowed list or is a Vercel domain
  const allowOrigin = origin && (
    allowedOrigins.includes(origin) || 
    (origin && origin.includes('.vercel.app'))
  ) ? origin : allowedOrigins[0] || '*';

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
};

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Set CORS headers even for errors
  setCorsHeaders(req, res);

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
  // Set CORS headers for 404 responses too
  setCorsHeaders(req, res);
  
  res.status(CONSTANTS.STATUS.NOT_FOUND).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
};

module.exports = { errorHandler, notFound };
