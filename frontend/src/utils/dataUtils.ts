import { CuisineData, Dish, FilterState, Category } from '@/types';
import { API_BASE } from '@/config/api';

// Load cuisine data from backend API
export async function loadCuisineData(): Promise<CuisineData> {
  try {
    const url = `${API_BASE}/menu`;
    console.log('Fetching menu data from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to load menu data: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('API Response received:', result.success ? 'Success' : 'Failed', result.message);
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to load menu data from server');
    }
    
    // Backend returns data in { success: true, data: CuisineData } format
    return result.data;
  } catch (error: unknown) {
    const err = error as Error;
    const errorWithName = error as Error & { name?: string };
    if (errorWithName.name === 'AbortError') {
      console.error('Request timeout - backend server may not be running');
      throw new Error('Request timeout: Backend server may not be responding. Please try again later.');
    } else if (errorWithName.name === 'TypeError' && err.message?.includes('Failed to fetch')) {
      console.error('Network error:', err.message);
      throw new Error('Cannot connect to backend server. Please check your internet connection and try again.');
    }
    console.error('Error loading cuisine data from API:', error);
    throw error;
  }
}

// Get the lowest price from all options in a dish
export function getLowestPrice(dish: Dish): number {
  return Math.min(...dish.options.map(option => option.price));
}

// Get the first option's short description for the dish card
export function getDishDescription(dish: Dish): string {
  return dish.options[0]?.short_description || '';
}

// Process dishes to add computed properties
export function processDishes(categories: Category[]): (Dish & { description: string; lowestPrice: number; category: string })[] {
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

// Load filter options from backend API
export async function loadFilterOptions() {
  try {
    const url = `${API_BASE}/menu/filter-options`;
    console.log('Fetching filter options from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    console.log('Filter options response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Filter options API Error Response:', errorText);
      throw new Error(`Failed to load filter options: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Filter options API Response received:', result.success ? 'Success' : 'Failed', result.message);
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to load filter options from server');
    }
    
    // Backend returns data in { success: true, data: filterOptions } format
    return result.data;
  } catch (error: unknown) {
    const err = error as Error;
    const errorWithName = error as Error & { name?: string };
    if (errorWithName.name === 'AbortError') {
      console.error('Filter options request timeout - backend server may not be running');
      throw new Error('Request timeout: Backend server may not be responding. Please try again later.');
    } else if (errorWithName.name === 'TypeError' && err.message?.includes('Failed to fetch')) {
      console.error('Filter options network error:', err.message);
      throw new Error('Cannot connect to backend server. Please check your internet connection and try again.');
    }
    console.error('Error loading filter options from API:', error);
    throw error;
  }
}

// Get all available filter options from the data (fallback function)
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
export function filterDishes(dishes: (Dish & { category: string; description: string; lowestPrice: number })[], filters: FilterState): (Dish & { category: string; description: string; lowestPrice: number })[] {
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
