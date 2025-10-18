import { useState, useCallback } from 'react';
import { FilterState } from '@/types';

const initialFilters: FilterState = {
  spiceLevel: null,
  dishTypes: [],
  categories: [],
  allergens: [],
  calorieRange: null
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const toggleArrayFilter = useCallback((
    filterKey: keyof Pick<FilterState, 'dishTypes' | 'categories' | 'allergens'>,
    value: string
  ) => {
    setFilters(prev => {
      const currentArray = prev[filterKey];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return { ...prev, [filterKey]: newArray };
    });
  }, []);

  const setSingleFilter = useCallback((
    filterKey: keyof Pick<FilterState, 'spiceLevel' | 'calorieRange'>,
    value: number | string | null
  ) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
    toggleArrayFilter,
    setSingleFilter
  };
}
