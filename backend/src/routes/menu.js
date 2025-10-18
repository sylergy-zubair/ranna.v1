const express = require('express');
const router = express.Router();
const {
  getMenu,
  getFilteredMenu,
  getFilterOptions,
  healthCheck
} = require('../controllers/menuController');
const { validateQuery } = require('../middleware/validate');
const { menuQuerySchema } = require('../utils/validators');

// Health check route
router.get('/health', healthCheck);

// Get full menu
router.get('/menu', getMenu);

// Get filtered menu with validation
router.get('/menu/filtered', validateQuery(menuQuerySchema), getFilteredMenu);

// Get available filter options
router.get('/menu/filter-options', getFilterOptions);

module.exports = router;
