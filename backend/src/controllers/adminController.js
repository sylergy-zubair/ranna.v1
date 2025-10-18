const Menu = require('../models/Menu');
const CONSTANTS = require('../utils/constants');
const { formatResponse, sanitizeMongoResponse } = require('../utils/helpers');
const cacheService = require('../services/cacheService');
const { v4: uuidv4 } = require('uuid');

// Get full menu (admin version with more details)
const getMenu = async (req, res) => {
  try {
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
  clearCache
};
