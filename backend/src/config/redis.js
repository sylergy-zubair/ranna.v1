const redis = require('redis');

let client;

const connectRedis = async () => {
  try {
    client = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
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
