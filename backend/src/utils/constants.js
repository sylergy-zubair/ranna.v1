// App constants
const CONSTANTS = {
  // API Status codes
  STATUS: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
  },

  // Cache TTL (Time To Live) in seconds
  CACHE_TTL: {
    FULL_MENU: 3600,      // 1 hour
    FILTERED_MENU: 1800,  // 30 minutes
    FILTER_OPTIONS: 7200  // 2 hours
  },

  // Filter options
  SPICE_LEVELS: [1, 2, 3, 4, 5],
  DISH_TYPES: [
    'Vegetarian',
    'Vegan', 
    'Chicken',
    'Lamb',
    'Indian Paneer',
    'Prawn',
    'Kng Prawn',
    'Fish',
    'Meat (Mutton)',
    'Gluten free',
    'Sweet',
    'Sour',
    'Creamy',
    'Healthy'
  ],
  CALORIE_RANGES: ['0-100', '100-200', '200-300', '300-400', '400-500', '500-600', '600+'],
  ALLERGENS: [
    'Eggs',
    'Fish',
    'Milk',
    'Mustard',
    'Tree Nut (Almond / Cashew Nut)',
    'Sesame Seed',
    'Sulphur dioxide (sulphites)',
    'Soya',
    'Celery',
    'Cereals (Gluten, Wheat)',
    'Cereals (Gluten, Barley)',
    'Cereals (Gluten, Rye)',
    'Cereals (Gluten, Oats)',
    'Crustaceans',
    'No Allergen',
    'Peanut',
    'Molluscs'
  ],

  // Rate limiting
  RATE_LIMITS: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100 // per window
  }
};

module.exports = CONSTANTS;
