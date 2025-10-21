const Joi = require('joi');

// Nutrition schema
const nutritionSchema = Joi.object({
  energy_kj: Joi.number().min(0).optional(),
  energy_kcal: Joi.number().min(0).optional(),
  fat: Joi.number().min(0).optional(),
  of_which_saturates: Joi.number().min(0).optional(),
  carbohydrate: Joi.number().min(0).optional(),
  of_which_sugars: Joi.number().min(0).optional(),
  protein: Joi.number().min(0).optional(),
  salt: Joi.number().min(0).optional(),
  total_weight_grams: Joi.number().min(0).optional()
});

// Option schema
const optionSchema = Joi.object({
  option_id: Joi.string().uuid().optional(),
  option_name: Joi.string().required(),
  short_description: Joi.string().required(),
  detailed_description: Joi.string().required(),
  price: Joi.number().positive().required(),
  dish_type: Joi.array().items(Joi.string().valid(
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
  )).required(),
  ingredients: Joi.array().items(Joi.string()).default([]),
  allergens: Joi.array().items(Joi.string().valid(
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
    'Lupin',
    'Peanut',
    'Molluscs'
  )).default([]),
  calorie_range: Joi.string().valid(
    '0-100', '100-200', '200-300', '300-400', '400-500', '500-600', '600+'
  ).required(),
  nutrition: nutritionSchema.optional()
});

// Dish schema
const dishSchema = Joi.object({
  dish_id: Joi.string().uuid().optional(),
  dish_title: Joi.string().required(),
  spice_level: Joi.number().integer().min(1).max(4).required(),
  image_url: Joi.string().uri().allow('').optional(),
  options: Joi.array().items(optionSchema).min(1).required()
});

// Category schema
const categorySchema = Joi.object({
  category_id: Joi.string().uuid().optional(),
  category: Joi.string().required(),
  dishes: Joi.array().items(dishSchema).default([])
});

// Menu schema
const menuSchema = Joi.object({
  categories: Joi.array().items(categorySchema).required()
});

// Admin validation schemas
const addDishSchema = Joi.object({
  categoryId: Joi.string().required(),
  dishData: dishSchema.required()
});

const updateDishSchema = Joi.object({
  dishId: Joi.string().required(),
  dishData: dishSchema.required()
});

const addCategorySchema = Joi.object({
  categoryData: categorySchema.required()
});

const updateMenuSchema = Joi.object({
  menuData: menuSchema.required()
});

// Validation middleware factory
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      allowUnknown: false,
      stripUnknown: true,
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    req.body = value;
    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      allowUnknown: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Parameter validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    req.params = value;
    next();
  };
};

module.exports = {
  validateBody,
  validateParams,
  addDishSchema,
  updateDishSchema,
  addCategorySchema,
  updateMenuSchema,
  dishIdsSchema: Joi.object({
    dishId: Joi.string().required()
  }),
  categoryIdsSchema: Joi.object({
    categoryId: Joi.string().required()
  }),
  optionIdsSchema: Joi.object({
    dishId: Joi.string().required(),
    optionId: Joi.string().required()
  }),
  categorySchema,
  dishSchema,
  optionSchema
};
