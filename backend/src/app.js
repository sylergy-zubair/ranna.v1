require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/database');
const { connectRedis } = require('./config/redis');
const corsMiddleware = require('./middleware/cors');
const rateLimiter = require('./middleware/rateLimiter');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// Trust proxy for Vercel deployment (fixes rate limiting issues)
app.set('trust proxy', 1);

// Initialize database connections
// For Vercel/serverless, we need to handle connections differently
const isVercel = process.env.VERCEL === '1';

if (isVercel) {
  // In serverless, connections are handled per request
  // Just initialize without awaiting to prevent blocking
  connectDB().catch(err => console.error('Database connection failed:', err));
} else {
  // In regular server mode, await connections
  connectDB();
}
connectRedis();

// Security middleware
app.use(helmet());

// Compression middleware
app.use(compression());

// CORS middleware
app.use(corsMiddleware);

// Rate limiting
app.use(rateLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/v1', require('./routes/menu'));
app.use('/api/v1/admin', require('./routes/admin'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Ranna Backend API',
    version: '1.0.0',
    endpoints: {
      menu: '/api/v1/menu',
      filteredMenu: '/api/v1/menu/filtered',
      filterOptions: '/api/v1/menu/filter-options',
      health: '/api/v1/health',
      admin: {
        menu: '/api/v1/admin/menu',
        addDish: '/api/v1/admin/menu/dish',
        updateDish: '/api/v1/admin/menu/dish',
        deleteDish: '/api/v1/admin/menu/dish/:dishId',
        addCategory: '/api/v1/admin/menu/category',
        updateMenu: '/api/v1/admin/menu',
        clearCache: '/api/v1/admin/cache/clear'
      }
    }
  });
});

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
