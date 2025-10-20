const filterDishes = (menuData, filters) => {
  if (!menuData || !menuData.categories) {
    return [];
  }

  const allDishes = menuData.categories.flatMap(category => 
    category.dishes.map(dish => ({
      ...dish,
      category: category.category
    }))
  );

  return allDishes.filter(dish => {
    // Spice level filter (single select)
    if (filters.spiceLevel && dish.spice_level !== parseInt(filters.spiceLevel)) {
      return false;
    }
    
    // Category filter (multi-select)
    if (filters.categories && filters.categories.length > 0) {
      const selectedCategories = Array.isArray(filters.categories) 
        ? filters.categories 
        : filters.categories.split(',');
      if (!selectedCategories.includes(dish.category)) {
        return false;
      }
    }
    
    // Dish type filter (multi-select)
    if (filters.dishTypes && filters.dishTypes.length > 0) {
      const selectedTypes = Array.isArray(filters.dishTypes)
        ? filters.dishTypes 
        : filters.dishTypes.split(',');
      const hasMatchingType = dish.options.some(option => 
        option.dish_type.some(type => selectedTypes.includes(type))
      );
      if (!hasMatchingType) return false;
    }
    
    // Calorie range filter (single select)
    if (filters.calorieRange) {
      const hasMatchingCalories = dish.options.some(option => 
        option.calorie_range === filters.calorieRange
      );
      if (!hasMatchingCalories) return false;
    }
    
    // Allergen exclusion filter (multi-select exclusion)
    if (filters.allergens && filters.allergens.length > 0) {
      const excludedAllergens = Array.isArray(filters.allergens)
        ? filters.allergens
        : filters.allergens.split(',');
      const hasExcludedAllergen = dish.options.some(option => 
        option.allergens.some(allergen => excludedAllergens.includes(allergen))
      );
      if (hasExcludedAllergen) return false;
    }
    
    return true;
  });
};

const CONSTANTS = require('./constants');

const getAvailableFilterOptions = (menuData) => {
  if (!menuData || !menuData.categories) {
    return {
      categories: [],
      dishTypes: CONSTANTS.DISH_TYPES, // Use predefined dish types
      allergens: CONSTANTS.ALLERGENS,  // Use predefined allergens
      calorieRanges: CONSTANTS.CALORIE_RANGES
    };
  }

  const allDishes = menuData.categories.flatMap(category => category.dishes);
  const allOptions = allDishes.flatMap(dish => dish.options);

  const categories = [...new Set(menuData.categories.map(cat => cat.category))];
  // Use predefined dish types and allergens instead of extracting from data
  const allergens = [...new Set(allOptions.flatMap(option => option.allergens))];
  const calorieRanges = [...new Set(allOptions.map(option => option.calorie_range))].filter(Boolean);

  return {
    categories: categories.sort(),
    dishTypes: CONSTANTS.DISH_TYPES, // Always return all predefined dish types
    allergens: CONSTANTS.ALLERGENS,  // Always return all predefined allergens
    calorieRanges: calorieRanges.sort()
  };
};

module.exports = {
  filterDishes,
  getAvailableFilterOptions
};
