const Joi = require('joi');

// Menu query validation schema
const menuQuerySchema = Joi.object({
  spiceLevel: Joi.number().integer().min(1).max(4).optional(),
  categories: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional(),
  dishTypes: Joi.alternatives().try(
    Joi.array().items(Joi.string().valid(
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
    )),
    Joi.string()
  ).optional(),
  allergens: Joi.alternatives().try(
    Joi.array().items(Joi.string().valid(
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
    )),
    Joi.string()
  ).optional(),
  calorieRange: Joi.string().optional().valid(
    '0-100', '100-200', '200-300', '300-400', '400-500', '500-600', '600+'
  )
});

// Validation middleware
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, { 
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

    // Handle comma-separated strings
    if (value.categories && typeof value.categories === 'string') {
      value.categories = value.categories.split(',').map(cat => cat.trim());
    }
    if (value.dishTypes && typeof value.dishTypes === 'string') {
      value.dishTypes = value.dishTypes.split(',').map(type => type.trim());
    }
    if (value.allergens && typeof value.allergens === 'string') {
      value.allergens = value.allergens.split(',').map(allergen => allergen.trim());
    }

    req.query = value;
    next();
  };
};

module.exports = {
  menuQuerySchema,
  validateQuery
};
