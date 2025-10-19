const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://ranna-v1.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001'
    ];

    // Allow Vercel preview deployments
    if (origin && origin.includes('.vercel.app')) {
      return callback(null, true);
    }

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma'],
  credentials: true
};

module.exports = cors(corsOptions);
