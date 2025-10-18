'use client';

import { useState, useEffect, useMemo } from 'react';
import { CuisineData, Dish, FilterState } from '@/types';
import { 
  loadCuisineData, 
  processDishes, 
  filterDishes, 
  getAvailableFilterOptions 
} from '@/utils/dataUtils';
import { useFilters } from '@/hooks/useFilters';
import DishCard from '@/components/DishCard';
import FilterPanel from '@/components/FilterPanel';
import MoreInfoModal from '@/components/MoreInfoModal';

export default function Home() {
  const [data, setData] = useState<CuisineData | null>(null);
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
        const cuisineData = await loadCuisineData();
        setData(cuisineData);
      } catch (err) {
        setError('Failed to load menu data. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process and filter dishes
  const processedDishes = useMemo(() => {
    if (!data) return [];
    return processDishes(data.categories);
  }, [data]);

  const filteredDishes = useMemo(() => {
    return filterDishes(processedDishes, filters);
  }, [processedDishes, filters]);

  // Get available filter options
  const availableOptions = useMemo(() => {
    if (!data) return { dishTypes: [], categories: [], allergens: [], calorieRanges: [] };
    return getAvailableFilterOptions(data.categories);
  }, [data]);

  const handleMoreInfo = (dish: Dish) => {
    console.log('More Info clicked for dish:', dish.dish_title);
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

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
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Ranna</h1>
            <p className="text-gray-600 mt-2">Authentic Indian Cuisine</p>
          </div>
        </div>
      </header>

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
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Menu</h2>
              <p className="text-gray-600">
                Showing {filteredDishes.length} dish{filteredDishes.length !== 1 ? 'es' : ''}
                {Object.values(filters).some(filter => 
                  Array.isArray(filter) ? filter.length > 0 : filter !== null
                ) && ' (filtered)'}
              </p>
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