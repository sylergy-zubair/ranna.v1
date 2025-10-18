import { FilterPanelProps } from '@/types';
import SpiceLevelFilter from './SpiceLevelFilter';
import DishTypeFilter from './DishTypeFilter';
import CategoryFilter from './CategoryFilter';
import AllergenFilter from './AllergenFilter';
import CalorieRangeFilter from './CalorieRangeFilter';

export default function FilterPanel({ 
  filters, 
  onFiltersChange, 
  availableOptions 
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        <button
          onClick={() => onFiltersChange({
            spiceLevel: null,
            dishTypes: [],
            categories: [],
            allergens: [],
            calorieRange: null
          })}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        <SpiceLevelFilter
          value={filters.spiceLevel}
          onChange={(value) => onFiltersChange({ ...filters, spiceLevel: value })}
        />

        <CategoryFilter
          value={filters.categories}
          options={availableOptions.categories}
          onChange={(value) => onFiltersChange({ ...filters, categories: value })}
        />

        <DishTypeFilter
          value={filters.dishTypes}
          options={availableOptions.dishTypes}
          onChange={(value) => onFiltersChange({ ...filters, dishTypes: value })}
        />

        <AllergenFilter
          value={filters.allergens}
          options={availableOptions.allergens}
          onChange={(value) => onFiltersChange({ ...filters, allergens: value })}
        />

        <CalorieRangeFilter
          value={filters.calorieRange}
          options={availableOptions.calorieRanges}
          onChange={(value) => onFiltersChange({ ...filters, calorieRange: value })}
        />
      </div>
    </div>
  );
}
