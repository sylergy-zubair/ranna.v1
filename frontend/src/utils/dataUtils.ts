import { CuisineData, Dish, FilterState, Category } from '@/types';

// Load cuisine data from JSON file
export async function loadCuisineData(): Promise<CuisineData> {
  try {
    const response = await fetch('/data/indian_cuisine.json');
    if (!response.ok) {
      throw new Error('Failed to load cuisine data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading cuisine data:', error);
    throw error;
  }
}

// Get the lowest price from all options in a dish
export function getLowestPrice(dish: Dish): number {
  return Math.min(...dish.options.map(option => option.price));
}

// Get the first option's description for the dish card
export function getDishDescription(dish: Dish): string {
  return dish.options[0]?.description || '';
}

// Process dishes to add computed properties
export function processDishes(categories: Category[]) {
  return categories.flatMap(category => 
    category.dishes.map(dish => ({
      ...dish,
      description: getDishDescription(dish),
      lowestPrice: getLowestPrice(dish),
      category: category.category
    }))
  );
}

// Get unique values from data for filter options
export function getUniqueValues<T>(data: T[], key: keyof T): string[] {
  const values = new Set<string>();
  data.forEach(item => {
    const value = item[key];
    if (Array.isArray(value)) {
      value.forEach(v => values.add(v));
    } else if (typeof value === 'string') {
      values.add(value);
    }
  });
  return Array.from(values).sort();
}

// Get all available filter options from the data
export function getAvailableFilterOptions(categories: Category[]) {
  const allDishes = categories.flatMap(cat => cat.dishes);
  const allOptions = allDishes.flatMap(dish => dish.options);
  
  return {
    dishTypes: getUniqueValues(allOptions, 'dish_type'),
    categories: categories.map(cat => cat.category),
    allergens: getUniqueValues(allOptions, 'allergens'),
    calorieRanges: getUniqueValues(allOptions, 'calorie_range')
  };
}

// Filter dishes based on selected criteria
export function filterDishes(dishes: (Dish & { category: string })[], filters: FilterState) {
  return dishes.filter(dish => {
    // Spice level match (single)
    if (filters.spiceLevel !== null && dish.spice_level !== filters.spiceLevel) {
      return false;
    }
    
    // Category match (multi)
    if (filters.categories.length > 0 && !filters.categories.includes(dish.category)) {
      return false;
    }
    
    // Check if any option matches dish_type filters (multi)
    if (filters.dishTypes.length > 0) {
      const hasMatchingDishType = dish.options.some(option => 
        filters.dishTypes.some(type => option.dish_type.includes(type))
      );
      if (!hasMatchingDishType) return false;
    }
    
    // Check if any option matches calorie range (single)
    if (filters.calorieRange !== null) {
      const hasMatchingCalorieRange = dish.options.some(option => 
        option.calorie_range === filters.calorieRange
      );
      if (!hasMatchingCalorieRange) return false;
    }
    
    // Exclude dishes with selected allergens (multi) - exclusion filter
    if (filters.allergens.length > 0) {
      const hasExcludedAllergen = dish.options.some(option => 
        filters.allergens.some(allergen => option.allergens.includes(allergen))
      );
      if (hasExcludedAllergen) return false;
    }
    
    return true;
  });
}

// Get spice level display info
export function getSpiceLevelInfo(level: number) {
  const spiceInfo = {
    1: { label: 'Mild', color: 'text-green-600', bgColor: 'bg-green-100' },
    2: { label: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    3: { label: 'Hot', color: 'text-red-600', bgColor: 'bg-red-100' }
  };
  return spiceInfo[level as keyof typeof spiceInfo] || spiceInfo[1];
}

// Format price for display
export function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}
