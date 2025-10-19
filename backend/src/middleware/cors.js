const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS Request Origin:', origin);
    console.log('FRONTEND_URL env:', process.env.FRONTEND_URL);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://ranna-v1.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001'
    ];

    // Allow Vercel preview deployments
    if (origin && origin.includes('.vercel.app')) {
      console.log('Allowing Vercel app:', origin);
      return callback(null, true);
    }

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('Allowing request with no origin');
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log('Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('Origin NOT allowed:', origin, 'Allowed origins:', allowedOrigins);
      // For debugging, let's be more permissive temporarily
      return callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false
};

module.exports = cors(corsOptions);
