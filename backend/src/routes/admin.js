const express = require('express');
const router = express.Router();
const {
  getMenu,
  addDish,
  updateDish,
  deleteDish,
  addCategory,
  deleteCategory,
  deleteOption,
  updateMenu,
  clearCache,
  login
} = require('../controllers/adminController');
const { validateBody, validateParams, addDishSchema, updateDishSchema, addCategorySchema, updateMenuSchema, dishIdsSchema, categoryIdsSchema, optionIdsSchema } = require('../utils/adminValidators');
const { authenticateAdmin } = require('../middleware/auth');

// Public login route (not protected)
router.post('/login', login);

// Protect all other admin routes
router.use(authenticateAdmin);

// Admin menu routes
router.get('/menu', getMenu);

// Add new dish to category
router.post('/menu/dish', validateBody(addDishSchema), addDish);

// Update existing dish
router.put('/menu/dish', validateBody(updateDishSchema), updateDish);

// Delete dish
router.delete('/menu/dish/:dishId', validateParams(dishIdsSchema), deleteDish);

// Add new category
router.post('/menu/category', validateBody(addCategorySchema), addCategory);

// Delete category
router.delete('/menu/category/:categoryId', validateParams(categoryIdsSchema), deleteCategory);

// Delete option from dish
router.delete('/menu/dish/:dishId/option/:optionId', validateParams(optionIdsSchema), deleteOption);

// Update entire menu (bulk operation)
router.put('/menu', validateBody(updateMenuSchema), updateMenu);

// Admin utilities
router.post('/cache/clear', clearCache);

module.exports = router;
