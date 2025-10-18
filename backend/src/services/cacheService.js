const { getClient } = require('../config/redis');
const CONSTANTS = require('../utils/constants');

const get = async (key) => {
  try {
    const client = getClient();
    if (!client) return null;

    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
};

const set = async (key, value, ttl = CONSTANTS.CACHE_TTL.FULL_MENU) => {
  try {
    const client = getClient();
    if (!client) return;

    await client.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error('Cache set error:', error);
  }
};

const del = async (key) => {
  try {
    const client = getClient();
    if (!client) return;

    await client.del(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
};

const deletePattern = async (pattern) => {
  try {
    const client = getClient();
    if (!client) return;

    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(keys);
    }
  } catch (error) {
    console.error('Cache delete pattern error:', error);
  }
};

module.exports = { 
  get, 
  set, 
  del, 
  deletePattern 
};
