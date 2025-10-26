const Menu = require('../models/Menu');
const { filterDishes, getAvailableFilterOptions } = require('../utils/filters');
const { generateCacheKey, formatResponse, sanitizeMongoResponse } = require('../utils/helpers');
const CONSTANTS = require('../utils/constants');
const cacheService = require('./cacheService');

// Ensure database connection before making queries
const ensureConnection = async () => {
  const mongoose = require('mongoose');
  const isVercel = process.env.VERCEL === '1';
  
  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    return;
  }
  
  // If connecting, wait for it to complete
  if (mongoose.connection.readyState === 2) {
    const timeoutDuration = isVercel ? 20000 : 15000;
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Connection timeout - waiting for MongoDB connection'));
      }, timeoutDuration);
      
      // Remove any existing listeners to avoid duplicates
      mongoose.connection.removeAllListeners('connected');
      mongoose.connection.removeAllListeners('error');
      
      mongoose.connection.once('connected', () => {
        clearTimeout(timeout);
        resolve();
      });
      
      mongoose.connection.once('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
    return;
  }
  
  // If disconnected or uninitialized, establish connection
  const connectDB = require('../config/database');
  await connectDB();
  
  // Double-check that we're actually connected before proceeding
  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Connection not ready after connectDB - readyState: ' + mongoose.connection.readyState));
      }, isVercel ? 10000 : 5000);
      
      mongoose.connection.once('connected', () => {
        clearTimeout(timeout);
        resolve();
      });
      
      mongoose.connection.once('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
  }
  
  // Final check - ensure we're actually connected
  if (mongoose.connection.readyState !== 1) {
    throw new Error(`MongoDB connection not ready. ReadyState: ${mongoose.connection.readyState}`);
  }
};

const getFullMenu = async () => {
  try {
    // Check cache first
    const cacheKey = 'menu:full';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return formatResponse(true, cached, 'Menu retrieved from cache');
    }

    // Ensure database connection before querying
    await ensureConnection();
    
    // Final verification before query
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      throw new Error(`Cannot query database: MongoDB connection not ready (readyState: ${mongoose.connection.readyState})`);
    }
    
    // Fetch from database
    const menu = await Menu.findOne().lean();
    if (!menu) {
      return formatResponse(false, null, 'Menu not found', 'No menu data available');
    }

    // Sanitize response
    const sanitizedData = sanitizeMongoResponse(menu);
    
    // Cache the result
    await cacheService.set(cacheKey, sanitizedData, CONSTANTS.CACHE_TTL.FULL_MENU);
    
    return formatResponse(true, sanitizedData, 'Menu retrieved successfully');
  } catch (error) {
    console.error('Error fetching full menu:', error);
    return formatResponse(false, null, 'Failed to fetch menu', error.message);
  }
};

const getFilteredMenu = async (filters) => {
  try {
    // Create cache key from filters
    const cacheKey = generateCacheKey('menu:filtered', filters);
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return formatResponse(true, cached, 'Filtered menu retrieved from cache');
    }

    // Get full menu data
    const menuResult = await getFullMenu();
    if (!menuResult.success) {
      return menuResult;
    }

    // Apply filters
    const filteredDishes = filterDishes(menuResult.data, filters);
    
    if (filteredDishes.length === 0) {
      return formatResponse(true, [], 'No dishes match the selected filters');
    }

    // Cache the filtered result
    await cacheService.set(cacheKey, filteredDishes, CONSTANTS.CACHE_TTL.FILTERED_MENU);
    
    return formatResponse(true, filteredDishes, 'Filtered menu retrieved successfully');
  } catch (error) {
    console.error('Error filtering menu:', error);
    return formatResponse(false, null, 'Failed to filter menu', error.message);
  }
};

const getFilterOptions = async () => {
  try {
    // Check cache first
    const cacheKey = 'menu:filter-options';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return formatResponse(true, cached, 'Filter options retrieved from cache');
    }

    // Get menu data
    const menuResult = await getFullMenu();
    if (!menuResult.success) {
      return menuResult;
    }

    // Extract filter options
    const filterOptions = getAvailableFilterOptions(menuResult.data);
    
    // Add predefined options
    const options = {
      ...filterOptions,
      spiceLevels: CONSTANTS.SPICE_LEVELS
    };

    // Cache the result
    await cacheService.set(cacheKey, options, CONSTANTS.CACHE_TTL.FILTER_OPTIONS);
    
    return formatResponse(true, options, 'Filter options retrieved successfully');
  } catch (error) {
    console.error('Error getting filter options:', error);
    return formatResponse(false, null, 'Failed to get filter options', error.message);
  }
};

const clearMenuCache = async () => {
  try {
    await cacheService.deletePattern('menu:*');
    return formatResponse(true, null, 'Menu cache cleared successfully');
  } catch (error) {
    console.error('Error clearing menu cache:', error);
    return formatResponse(false, null, 'Failed to clear cache', error.message);
  }
};

// Get featured dishes
const getFeaturedDishes = async () => {
  try {
    await ensureConnection();
    
    const menu = await Menu.findOne().lean();
    if (!menu) {
      return formatResponse(false, null, 'Menu not found');
    }

    // Extract all dishes from all categories
    const allDishes = menu.categories.flatMap(category => 
      category.dishes.map(dish => ({
        ...dish,
        category: category.category
      }))
    );

    // Filter dishes that are marked as featured
    const featuredDishes = allDishes.filter(dish => dish.is_featured === true);

    // Limit to 7 dishes maximum
    const limitedFeaturedDishes = featuredDishes.slice(0, 7);

    const sanitizedDishes = limitedFeaturedDishes.map(dish => sanitizeMongoResponse(dish));
    
    return formatResponse(true, sanitizedDishes, 'Featured dishes retrieved successfully');
  } catch (error) {
    console.error('Menu service error - getFeaturedDishes:', error);
    return formatResponse(false, null, 'Internal server error', error.message);
  }
};

module.exports = {
  getFullMenu,
  getFilteredMenu,
  getFilterOptions,
  getFeaturedDishes,
  clearMenuCache,
  ensureConnection
};
