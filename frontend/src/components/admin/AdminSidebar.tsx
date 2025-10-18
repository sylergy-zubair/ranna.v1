'use client';

import { CuisineData, Category, Dish } from '@/types';

interface AdminSidebarProps {
  menu: CuisineData | null;
  selectedCategory: string | null;
  selectedDish: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onDishSelect: (dishId: string | null) => void;
  onNewCategory: () => void;
}

export default function AdminSidebar({
  menu,
  selectedCategory,
  selectedDish,
  onCategorySelect,
  onDishSelect,
  onNewCategory,
}: AdminSidebarProps) {
  if (!menu) {
    return (
      <div className="p-4">
        <p className="text-gray-500">No menu data available</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          <button
            onClick={onNewCategory}
            className="px-3 py-1 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600"
          >
            + Add
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {menu.categories.map((category) => (
            <div key={category.category_id} className="mb-2">
              <button
                onClick={() => onCategorySelect(category.category_id)}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  selectedCategory === category.category_id
                    ? 'bg-orange-100 text-orange-800 border border-orange-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category.category}</span>
                  <span className="text-xs text-gray-500">
                    {category.dishes.length} dish{category.dishes.length !== 1 ? 'es' : ''}
                  </span>
                </div>
              </button>

              {/* Dishes in selected category */}
              {selectedCategory === category.category_id && (
                <div className="ml-4 mt-2 space-y-1">
                  {category.dishes.map((dish) => (
                    <button
                      key={dish.dish_id}
                      onClick={() => onDishSelect(dish.dish_id)}
                      className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                        selectedDish === dish.dish_id
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{dish.dish_title}</span>
                        <span className="text-xs text-gray-500">
                          {dish.options.length} option{dish.options.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </button>
                  ))}
                  
                  <button
                    onClick={() => onDishSelect('new')}
                    className="w-full text-left p-2 rounded-md text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                  >
                    + Add new dish
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">
          <div className="mb-1">
            <strong>Total Categories:</strong> {menu.categories.length}
          </div>
          <div>
            <strong>Total Dishes:</strong>{' '}
            {menu.categories.reduce((sum, cat) => sum + cat.dishes.length, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
