const cors = require('cors');

// Define allowed origins
const getAllowedOrigins = () => {
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://ranna-v1.vercel.app',
    'https://ranna-v1-8357.vercel.app', // Add the specific deployment URL
    'http://localhost:3000',
    'http://localhost:3001'
  ].filter(Boolean); // Remove undefined values
  
  console.log('Allowed origins configured:', allowedOrigins);
  return allowedOrigins;
};

const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS Request Origin:', origin);
    console.log('Request Method:', arguments[2]?.method); // The req object is passed as 3rd argument
    
    const allowedOrigins = getAllowedOrigins();
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('Allowing request with no origin');
      return callback(null, true);
    }

    // Allow Vercel preview deployments and any .vercel.app domain
    if (origin && (origin.includes('.vercel.app') || origin.includes('vercel.app'))) {
      console.log('Allowing Vercel app:', origin);
      return callback(null, true);
    }

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      console.log('Origin allowed:', origin);
      return callback(null, true);
    } else {
      console.log('Origin NOT allowed:', origin, 'Allowed origins:', allowedOrigins);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With', 
    'Content-Type', 
    'Accept', 
    'Authorization', 
    'Cache-Control', 
    'Pragma'
  ],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false
};

module.exports = cors(corsOptions);
