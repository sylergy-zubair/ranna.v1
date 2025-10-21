'use client';

import { useState, useEffect, useMemo } from 'react';
import { CuisineData, Dish } from '@/types';
import { 
  loadCuisineData, 
  loadFilterOptions,
  processDishes, 
  filterDishes, 
  getAvailableFilterOptions 
} from '@/utils/dataUtils';
import { useFilters } from '@/hooks/useFilters';
import DishCard from '@/components/DishCard';
import FilterPanel from '@/components/FilterPanel';
import CategoryButtonFilter from '@/components/CategoryButtonFilter';
import MoreInfoModal from '@/components/MoreInfoModal';

export default function MenuPage() {
  const [data, setData] = useState<CuisineData | null>(null);
  const [filterOptions, setFilterOptions] = useState<{
    dishTypes: string[];
    categories: string[];
    allergens: string[];
    calorieRanges: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { filters, updateFilters } = useFilters();

  // Load data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load both menu data and filter options from backend
        const [cuisineData, options] = await Promise.all([
          loadCuisineData(),
          loadFilterOptions().catch(err => {
            console.warn('Failed to load filter options from API, will use fallback:', err);
            return null;
          })
        ]);
        
        setData(cuisineData);
        setFilterOptions(options);
      } catch (err: unknown) {
        console.error('Error loading data:', err);
        
        const error = err as Error;
        const errorWithName = err as Error & { name?: string };
        
        // Provide more specific error messages based on the error type
        if (error.message?.includes('Cannot connect to backend server') || 
            error.message?.includes('Failed to fetch') ||
            errorWithName.name === 'TypeError') {
          setError(
            'Cannot connect to backend server. Please check your internet connection and try again later.'
          );
        } else if (error.message?.includes('Request timeout')) {
          setError('Request timed out. Please try again later.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process dishes and apply filters
  const processedDishes = useMemo(() => {
    if (!data?.categories) return [];
    return processDishes(data.categories);
  }, [data]);

  const filteredDishes = useMemo(() => {
    return filterDishes(processedDishes, filters);
  }, [processedDishes, filters]);

  const availableOptions = useMemo(() => {
    if (!filterOptions) {
      return getAvailableFilterOptions(data?.categories || []);
    }
    return filterOptions;
  }, [filterOptions, data]);

  const handleMoreInfo = (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600">Discover our authentic Indian dishes</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={updateFilters}
              availableOptions={availableOptions}
            />
          </div>

          {/* Dishes Grid */}
          <div className="lg:col-span-3">
            {/* Fixed Category and Menu Header */}
            <div className="sticky top-24 bg-gray-50 z-10 pb-4 -mx-4 px-4">
              <div className="mb-6">
                
                <p className="text-gray-600 mb-4">
                  Showing {filteredDishes.length} dish{filteredDishes.length !== 1 ? 'es' : ''}
                  {Object.values(filters).some(filter => 
                    Array.isArray(filter) ? filter.length > 0 : filter !== null
                  ) && ' (filtered)'}
                </p>
                
                {/* Category Filter Buttons */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <CategoryButtonFilter
                    value={filters.categories}
                    options={availableOptions.categories}
                    onChange={(value) => updateFilters({ ...filters, categories: value })}
                  />
                </div>
              </div>
            </div>

            {filteredDishes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No dishes found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more options.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDishes.map((dish, index) => (
                  <DishCard
                    key={`${dish.dish_title}-${index}`}
                    dish={dish}
                    onMoreInfo={handleMoreInfo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* More Info Modal */}
      <MoreInfoModal
        dish={selectedDish}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
