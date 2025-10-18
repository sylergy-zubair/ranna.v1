'use client';

import { useState } from 'react';
import { Category } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface CategoryFormProps {
  category: Category | null;
  isEditing: boolean;
  loading: boolean;
  onSave: (categoryData: Category) => void;
  onNewDish: () => void;
}

export default function CategoryForm({
  category,
  isEditing,
  loading,
  onSave,
  onNewDish,
}: CategoryFormProps) {
  const [formData, setFormData] = useState({
    category: category?.category || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category.trim()) {
      alert('Category name is required');
      return;
    }

    const categoryData: Category = {
      category_id: category?.category_id || uuidv4(),
      category: formData.category.trim(),
      dishes: category?.dishes || [],
    };

    onSave(categoryData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Category' : 'Add New Category'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isEditing 
              ? 'Update the category information and view its dishes'
              : 'Create a new category for your menu items'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., Traditional Curry, Tandoori"
              required
              disabled={loading}
            />
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div>
              {isEditing && category && (
                <div className="text-sm text-gray-600">
                  <div className="mb-1">
                    <strong>{category.dishes.length}</strong> dish{category.dishes.length !== 1 ? 'es' : ''} in this category
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              {isEditing && category && (
                <button
                  type="button"
                  onClick={onNewDish}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                  disabled={loading}
                >
                  Add New Dish
                </button>
              )}
              
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : isEditing ? 'Update Category' : 'Create Category'}
              </button>
            </div>
          </div>
        </form>

        {isEditing && category && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dishes in this Category</h3>
            {category.dishes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No dishes in this category yet.</p>
                <button
                  onClick={onNewDish}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Add First Dish
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.dishes.map((dish) => (
                  <div
                    key={dish.dish_id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{dish.dish_title}</h4>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Level {dish.spice_level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {dish.options.length} option{dish.options.length !== 1 ? 's' : ''}
                    </p>
                    <div className="text-sm text-gray-500">
                      Price: £{Math.min(...dish.options.map(o => o.price)).toFixed(2)} - £{Math.max(...dish.options.map(o => o.price)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
