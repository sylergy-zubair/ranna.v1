'use client';

import { CuisineData } from '@/types';

interface MenuViewProps {
  menu: CuisineData | null;
}

export default function MenuView({ menu }: MenuViewProps) {
  if (!menu || !menu.categories) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-4">📋</div>
        <p className="text-gray-600">No menu data available</p>
      </div>
    );
  }

  const totalDishes = menu.categories.reduce((sum, category) => sum + category.dishes.length, 0);
  const totalOptions = menu.categories.reduce((sum, category) => 
    sum + category.dishes.reduce((dishSum, dish) => dishSum + dish.options.length, 0), 0
  );

  return (
    <div className="space-y-8">
      {/* Menu Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{menu.categories.length}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{totalDishes}</div>
            <div className="text-sm text-gray-600">Dishes</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{totalOptions}</div>
            <div className="text-sm text-gray-600">Options</div>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {menu.categories.map((category) => (
          <div key={category.category_id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{category.category}</h4>
                <p className="text-gray-600">
                  {category.dishes.length} dish{category.dishes.length !== 1 ? 'es' : ''}
                </p>
              </div>
            </div>

            {category.dishes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.dishes.map((dish) => (
                  <div
                    key={dish.dish_id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-gray-900">{dish.dish_title}</h5>
                      <span className="flex space-x-1">
                        {Array.from({ length: dish.spice_level }, (_, i) => (
                          <span key={i} className="text-red-500">🌶️</span>
                        ))}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        {dish.options.length} option{dish.options.length !== 1 ? 's' : ''}
                      </div>
                      
                      <div className="text-sm text-gray-700">
                        Price range: £{Math.min(...dish.options.map(o => o.price)).toFixed(2)} - £{Math.max(...dish.options.map(o => o.price)).toFixed(2)}
                      </div>

                      {dish.options.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-500">Options:</div>
                          <div className="flex flex-wrap gap-1">
                            {dish.options.slice(0, 3).map((option, index) => (
                              <span
                                key={option.option_id}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                              >
                                {option.option_name}
                              </span>
                            ))}
                            {dish.options.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{dish.options.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                <p>No dishes in this category yet.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
