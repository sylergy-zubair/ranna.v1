const redis = require('redis');

let client;

const connectRedis = async () => {
  try {
    // Skip Redis in production if no REDIS_URL is provided
    if (process.env.NODE_ENV === 'production' && !process.env.REDIS_URL) {
      console.log('Redis disabled in production - no REDIS_URL provided');
      return null;
    }

    // Skip Redis if URL is localhost and we're in production
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    if (process.env.NODE_ENV === 'production' && redisUrl.includes('localhost')) {
      console.log('Redis disabled in production - localhost URL detected');
      return null;
    }

    client = redis.createClient({
      url: redisUrl
    });

    client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    client.on('connect', () => {
      console.log('Redis Client Connected');
    });

    await client.connect();
    return client;
  } catch (error) {
    console.error('Redis connection error:', error.message);
    // Continue without Redis if connection fails
    return null;
  }
};

const getClient = () => client;

module.exports = { connectRedis, getClient };
