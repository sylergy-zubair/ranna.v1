const Menu = require('../models/Menu');
const CONSTANTS = require('../utils/constants');
const { formatResponse, sanitizeMongoResponse } = require('../utils/helpers');
const cacheService = require('../services/cacheService');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

// Ensure database connection before making queries
const ensureConnection = async () => {
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

// Get full menu (admin version with more details)
const getMenu = async (req, res) => {
  try {
    // Ensure database connection before querying
    await ensureConnection();
    
    // Final verification before query
    if (mongoose.connection.readyState !== 1) {
      throw new Error(`Cannot query database: MongoDB connection not ready (readyState: ${mongoose.connection.readyState})`);
    }
    
    const menu = await Menu.findOne().lean();
    if (!menu) {
      return res.status(CONSTANTS.STATUS.NOT_FOUND).json(
        formatResponse(false, null, 'Menu not found')
      );
    }

    const sanitizedData = sanitizeMongoResponse(menu);
    res.status(CONSTANTS.STATUS.SUCCESS).json(
      formatResponse(true, sanitizedData, 'Menu retrieved successfully')
    );
  } catch (error) {
    console.error('Admin getMenu error:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json(
      formatResponse(false, null, 'Failed to fetch menu', error.message)
    );
  }
};

// Add new dish to a category
const addDish = async (req, res) => {
  try {
    const { categoryId, dishData } = req.body;
    
    if (!categoryId || !dishData) {
      return res.status(CONSTANTS.STATUS.BAD_REQUEST).json(
        formatResponse(false, null, 'Category ID and dish data are required')
      );
    }

    // Generate UUID for dish if not provided
    if (!dishData.dish_id) {
      dishData.dish_id = uuidv4();
    }

    // Generate UUIDs for options if not provided
    dishData.options = dishData.options.map(option => ({
      ...option,
      option_id: option.option_id || uuidv4()
    }));

    // Ensure database connection before querying
    await ensureConnection();
    
    const menu = await Menu.findOne();
    if (!menu) {
      return res.status(CONSTANTS.STATUS.NOT_FOUND).json(
        formatResponse(false, null, 'Menu not found')
      );
    }

    // Find the category and add the dish
    const category = menu.categories.find(cat => cat.category_id === categoryId);
    if (!category) {
      return res.status(CONSTANTS.STATUS.NOT_FOUND).json(
        formatResponse(false, null, 'Category not found')
      );
    }

    category.dishes.push(dishData);
    await menu.save();

    // Clear menu cache
    await cacheService.deletePattern('menu:*');

    res.status(CONSTANTS.STATUS.CREATED).json(
      formatResponse(true, dishData, 'Dish added successfully')
    );
  } catch (error) {
    console.error('Admin addDish error:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json(
      formatResponse(false, null, 'Failed to add dish', error.message)
    );
  }
};

// Update dish
const updateDish = async (req, res) => {
  try {
    const { dishId, dishData } = req.body;
    
    if (!dishId || !dishData) {
      return res.status(CONSTANTS.STATUS.BAD_REQUEST).json(
        formatResponse(false, null, 'Dish ID and dish data are required')
      );
    }

    // Ensure database connection before querying
    await ensureConnection();
    
    const menu = await Menu.findOne();
    if (!menu) {
      return res.status(CONSTANTS.STATUS.NOT_FOUND).json(
        formatResponse(false, null, 'Menu not found')
      );
    }

    // Find and update the dish
    let dishFound = false;
    menu.categories.forEach(category => {
      const dish = category.dishes.find(d => d.dish_id === dishId);
      if (dish) {
        dishFound = true;
        // Update dish properties
        Object.keys(dishData).forEach(key => {
          if (key !== 'dish_id' && dishData[key] !== undefined) {
            dish[key] = dishData[key];
          }
        });
      }
    });

    if (!dishFound) {
      return res.status(CONSTANTS.STATUS.NOT_FOUND).json(
        formatResponse(false, null, 'Dish not found')
      );
    }

    await menu.save();

    // Clear menu cache
    await cacheService.deletePattern('menu:*');

    res.status(CONSTANTS.STATUS.SUCCESS).json(
      formatResponse(true, dishData, 'Dish updated successfully')
    );
  } catch (error) {
    console.error('Admin updateDish error:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json(
      formatResponse(false, null, 'Failed to update dish', error.message)
    );
  }
};

// Delete dish
const deleteDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    
    if (!dishId) {
      return res.status(CONSTANTS.STATUS.BAD_REQUEST).json(
        formatResponse(false, null, 'Dish ID is required')
      );
    }

    const menu = await Menu.findOne();
    if (!menu) {
      return res.status(CONSTANTS.STATUS.NOT_FOUND).json(
        formatResponse(false, null, 'Menu not found')
      );
    }

    // Find and remove the dish
    let dishFound = false;
    menu.categories.forEach(category => {
      const dishIndex = category.dishes.findIndex(d => d.dish_id === dishId);
      if (dishIndex !== -1) {
        dishFound = true;
        category.dishes.splice(dishIndex, 1);
      }
    });

    if (!dishFound) {
      return res.status(CONSTANTS.STATUS.NOT_FOUND).json(
        formatResponse(false, null, 'Dish not found')
      );
    }

    await menu.save();

    // Clear menu cache
    await cacheService.deletePattern('menu:*');

    res.status(CONSTANTS.STATUS.SUCCESS).json(
      formatResponse(true, null, 'Dish deleted successfully')
    );
  } catch (error) {
    console.error('Admin deleteDish error:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json(
      formatResponse(false, null, 'Failed to delete dish', error.message)
    );
  }
};

// Add new category
const addCategory = async (req, res) => {
  try {
    const { categoryData } = req.body;
    
    if (!categoryData || !categoryData.category) {
      return res.status(CONSTANTS.STATUS.BAD_REQUEST).json(
        formatResponse(false, null, 'Category data is required')
      );
    }

    // Generate UUID for category if not provided
    if (!categoryData.category_id) {
      categoryData.category_id = uuidv4();
    }

    const menu = await Menu.findOne();
    if (!menu) {
      return res.status(CONSTANTS.STATUS.NOT_FOUND).json(
        formatResponse(false, null, 'Menu not found')
      );
    }

    // Initialize dishes array if not provided
    if (!categoryData.dishes) {
      categoryData.dishes = [];
    }

    menu.categories.push(categoryData);
    await menu.save();

    // Clear menu cache
    await cacheService.deletePattern('menu:*');

    res.status(CONSTANTS.STATUS.CREATED).json(
      formatResponse(true, categoryData, 'Category added successfully')
    );
  } catch (error) {
    console.error('Admin addCategory error:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json(
      formatResponse(false, null, 'Failed to add category', error.message)
    );
  }
};

// Update entire menu (bulk operation)
const updateMenu = async (req, res) => {
  try {
    const { menuData } = req.body;
    
    if (!menuData || !menuData.categories) {
      return res.status(CONSTANTS.STATUS.BAD_REQUEST).json(
        formatResponse(false, null, 'Menu data with categories is required')
      );
    }

    // Ensure UUIDs are generated for all entities
    menuData.categories.forEach(category => {
      if (!category.category_id) {
        category.category_id = uuidv4();
      }
      category.dishes.forEach(dish => {
        if (!dish.dish_id) {
          dish.dish_id = uuidv4();
        }
        dish.options.forEach(option => {
          if (!option.option_id) {
            option.option_id = uuidv4();
          }
        });
      });
    });

    const menu = await Menu.findOne();
    if (!menu) {
      return res.status(CONSTANTS.STATUS.NOT_FOUND).json(
        formatResponse(false, null, 'Menu not found')
      );
    }

    // Update the menu
    menu.categories = menuData.categories;
    await menu.save();

    // Clear menu cache
    await cacheService.deletePattern('menu:*');

    res.status(CONSTANTS.STATUS.SUCCESS).json(
      formatResponse(true, menuData, 'Menu updated successfully')
    );
  } catch (error) {
    console.error('Admin updateMenu error:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json(
      formatResponse(false, null, 'Failed to update menu', error.message)
    );
  }
};

// Admin login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(CONSTANTS.STATUS.BAD_REQUEST).json(
        formatResponse(false, null, 'Username and password are required')
      );
    }

    // Simple hardcoded credentials (for development)
    // In production, you should hash passwords and store in database
    const validCredentials = {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    };

    if (username === validCredentials.username && password === validCredentials.password) {
      // Simple token (in production, use proper JWT)
      const token = process.env.ADMIN_TOKEN || 'simple-admin-token';
      
      res.status(CONSTANTS.STATUS.SUCCESS).json(
        formatResponse(true, { token }, 'Login successful')
      );
    } else {
      res.status(CONSTANTS.STATUS.UNAUTHORIZED).json(
        formatResponse(false, null, 'Invalid credentials')
      );
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json(
      formatResponse(false, null, 'Login failed', error.message)
    );
  }
};

// Clear cache (admin utility)
const clearCache = async (req, res) => {
  try {
    await cacheService.deletePattern('menu:*');
    res.status(CONSTANTS.STATUS.SUCCESS).json(
      formatResponse(true, null, 'Cache cleared successfully')
    );
  } catch (error) {
    console.error('Admin clearCache error:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json(
      formatResponse(false, null, 'Failed to clear cache', error.message)
    );
  }
};

module.exports = {
  getMenu,
  addDish,
  updateDish,
  deleteDish,
  addCategory,
  updateMenu,
  clearCache,
  login
};
