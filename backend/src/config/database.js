const mongoose = require('mongoose');

// Configure mongoose for serverless compatibility
// In production on Vercel, we need to handle connection pooling better
const isVercel = process.env.VERCEL === '1';

if (!isVercel) {
  mongoose.set('bufferCommands', false);
  mongoose.set('bufferMaxEntries', 0);
}

const connectDB = async (retries = 5, delay = 3000) => {
  try {
    // Enhanced connection options for better reliability
    const options = {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      retryWrites: true,
      retryReads: true,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      retryCount: (5 - retries) + 1
    });
    
    if (retries > 0) {
      console.log(`🔄 Retrying connection in ${delay/1000} seconds... (${retries} attempts left)`);
      setTimeout(() => {
        connectDB(retries - 1, delay);
      }, delay);
    } else {
      console.error('❌ Max retries reached. Database connection failed.');
      // Don't exit process in development mode to allow graceful handling
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    }
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Connection Error:', err);
});

module.exports = connectDB;
