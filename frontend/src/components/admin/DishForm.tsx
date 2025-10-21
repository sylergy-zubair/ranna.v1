'use client';

import { useState, useEffect } from 'react';
import { Category, Dish, Option, Nutrition } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { DISH_TYPES as DISH_TYPES_CONSTANTS, ALLERGENS as ALLERGENS_CONSTANTS } from '@/utils/constants';

interface DishFormProps {
  category: Category;
  dish: Dish | null;
  isEditing: boolean;
  loading: boolean;
  onSave: (dishData: Dish) => void;
  onDelete?: (dishId: string) => void;
  onBack: () => void;
}

const initialNutrition: Nutrition = {
  energy_kj: 0,
  energy_kcal: 0,
  fat: 0,
  of_which_saturates: 0,
  carbohydrate: 0,
  of_which_sugars: 0,
  protein: 0,
  salt: 0,
  total_weight_grams: 0,
};

const initialOption: Option = {
  option_id: '',
  option_name: '',
  short_description: '',
  detailed_description: '',
  price: 0,
  dish_type: [],
  ingredients: [],
  allergens: [],
  calorie_range: '0-100',
  nutrition: initialNutrition,
};

const DISH_TYPES = DISH_TYPES_CONSTANTS;
const ALLERGENS = ALLERGENS_CONSTANTS;

export default function DishForm({
  category,
  dish,
  isEditing,
  loading,
  onSave,
  onDelete,
  onBack,
}: DishFormProps) {
  const [formData, setFormData] = useState({
    dish_title: dish?.dish_title || '',
    spice_level: dish?.spice_level || 1,
    image_url: dish?.image_url || '',
  });

  const [options, setOptions] = useState<Option[]>(dish?.options || []);

  useEffect(() => {
    if (dish) {
      setFormData({
        dish_title: dish.dish_title || '',
        spice_level: dish.spice_level || 1,
        image_url: dish.image_url || '',
      });
      setOptions(dish.options || []);
    } else {
      // Reset to empty state when creating new dish
      setFormData({
        dish_title: '',
        spice_level: 1,
        image_url: '',
      });
      setOptions([]);
    }
  }, [dish]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOptionChange = (optionId: string, field: string, value: string | number | string[] | Nutrition) => {
    setOptions(prev => prev.map(option => 
      option.option_id === optionId 
        ? { ...option, [field]: value }
        : option
    ));
  };

  const addOption = () => {
    const newOption: Option = {
      ...initialOption,
      option_id: uuidv4(),
      option_name: '',
    };
    setOptions(prev => [...prev, newOption]);
  };

  const removeOption = (optionId: string) => {
    setOptions(prev => prev.filter(option => option.option_id !== optionId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.dish_title.trim()) {
      alert('Dish title is required');
      return;
    }

    if (options.length === 0) {
      alert('At least one option is required');
      return;
    }

    // Validate that each option has at least one dish type
    for (const option of options) {
      if (!option.dish_type || option.dish_type.length === 0) {
        alert(`Option "${option.option_name || 'Untitled'}" must have at least one dish type selected`);
        return;
      }
    }

    // Clean and validate dish types before sending
    const cleanedOptions = options.map(option => ({
      ...option,
      dish_type: option.dish_type.filter(type => 
        type && type.trim() && DISH_TYPES.includes(type.trim())
      )
    }));

    // Re-validate after cleaning
    for (const option of cleanedOptions) {
      if (!option.dish_type || option.dish_type.length === 0) {
        alert(`Option "${option.option_name || 'Untitled'}" must have at least one valid dish type selected`);
        return;
      }
    }

    const dishData: Dish = {
      dish_id: dish?.dish_id || uuidv4(),
      dish_title: formData.dish_title.trim(),
      spice_level: formData.spice_level,
      image_url: formData.image_url.trim(),
      options: cleanedOptions,
    };

    onSave(dishData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit Dish' : 'Add New Dish'}
              </h2>
              <p className="text-gray-600 mt-1">
                {category.category} • {isEditing ? 'Update dish information' : 'Create new dish'}
              </p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Dish Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dish_title" className="block text-sm font-medium text-gray-700 mb-2">
                Dish Title *
              </label>
              <input
                type="text"
                id="dish_title"
                name="dish_title"
                value={formData.dish_title || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Chicken Biryani"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="spice_level" className="block text-sm font-medium text-gray-700 mb-2">
                Spice Level *
              </label>
              <select
                id="spice_level"
                name="spice_level"
                value={formData.spice_level || 1}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                disabled={loading}
              >
                <option value={1}>1 - Mild</option>
                <option value={2}>2 - Medium</option>
                <option value={3}>3 - Hot</option>
                <option value={4}>4 - Extra Hot</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
          </div>

          {/* Options Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Dish Options</h3>
              <button
                type="button"
                onClick={addOption}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                disabled={loading}
              >
                + Add Option
              </button>
            </div>

            {options.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <p>No options yet. Click &quot;Add Option&quot; to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {options.map((option, index) => (
                  <OptionForm
                    key={option.option_id}
                    option={option}
                    index={index}
                    onUpdate={(field, value) => handleOptionChange(option.option_id, field, value)}
                    onRemove={() => removeOption(option.option_id)}
                    disabled={loading}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div>
              {isEditing && dish && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this dish?')) {
                      onDelete(dish.dish_id);
                    }
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                  disabled={loading}
                >
                  Delete Dish
                </button>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : isEditing ? 'Update Dish' : 'Create Dish'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Option Form Component
interface OptionFormProps {
  option: Option;
  index: number;
  onUpdate: (field: string, value: string | number | string[] | Nutrition) => void;
  onRemove: () => void;
  disabled: boolean;
}

function OptionForm({ option, index, onUpdate, onRemove, disabled }: OptionFormProps) {
  const handleChange = (field: string, value: string | number | string[] | Nutrition) => {
    onUpdate(field, value);
  };

  const handleArrayChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(',').map(item => item.trim()).filter(item => item);
    onUpdate(field, value);
  };

  const handleNutritionChange = (field: keyof Nutrition, value: number) => {
    onUpdate('nutrition', {
      ...option.nutrition,
      [field]: value,
    });
  };

  const handleDishTypeToggle = (dishType: string) => {
    const currentTypes = option.dish_type || [];
    const newTypes = currentTypes.includes(dishType)
      ? currentTypes.filter(type => type !== dishType)
      : [...currentTypes, dishType];
    onUpdate('dish_type', newTypes);
  };

  const handleAllergenToggle = (allergen: string) => {
    const currentAllergens = option.allergens || [];
    const newAllergens = currentAllergens.includes(allergen)
      ? currentAllergens.filter(a => a !== allergen)
      : [...currentAllergens, allergen];
    onUpdate('allergens', newAllergens);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-gray-900">Option {index + 1}</h4>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
          disabled={disabled}
        >
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Option Name *</label>
          <input
            type="text"
            value={option.option_name}
            onChange={(e) => handleChange('option_name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="e.g., Chicken, Vegetarian, Large"
            required
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (£) *</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={option.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Calorie Range *</label>
          <select
            value={option.calorie_range}
            onChange={(e) => handleChange('calorie_range', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
            disabled={disabled}
          >
            <option value="0-100">0-100</option>
            <option value="100-200">100-200</option>
            <option value="200-300">200-300</option>
            <option value="300-400">300-400</option>
            <option value="400-500">400-500</option>
            <option value="500-600">500-600</option>
            <option value="600+">600+</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Dish Type * ({DISH_TYPES.length} options)</label>
          <div className="flex flex-wrap gap-3 p-3 border border-gray-200 rounded-md bg-gray-50 min-h-[120px]">
            {DISH_TYPES.map((dishType, index) => (
              <label key={dishType} className="flex items-center space-x-2 cursor-pointer p-1">
                <input
                  type="checkbox"
                  checked={option.dish_type.includes(dishType)}
                  onChange={() => handleDishTypeToggle(dishType)}
                  disabled={disabled}
                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700">{dishType}</span>
                {process.env.NODE_ENV === 'development' && (
                  <span className="text-xs text-gray-400 ml-1">({index + 1})</span>
                )}
              </label>
            ))}
          </div>
          {option.dish_type.length === 0 && (
            <p className="text-xs text-red-500 mt-1">Please select at least one dish type</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
        <textarea
          value={option.short_description}
          onChange={(e) => handleChange('short_description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          rows={2}
          placeholder="Brief description for menu cards"
          required
          disabled={disabled}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description *</label>
        <textarea
          value={option.detailed_description}
          onChange={(e) => handleChange('detailed_description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          rows={3}
          placeholder="Detailed description for more info modal"
          required
          disabled={disabled}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
        <textarea
          value={Array.isArray(option.ingredients) ? option.ingredients.join(', ') : option.ingredients || ''}
          onChange={(e) => {
            // Convert the text to an array for storage, but treat it as a single text block
            const ingredientsText = e.target.value;
            handleChange('ingredients', [ingredientsText]);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          rows={3}
          placeholder="List all ingredients used in this dish option..."
          disabled={disabled}
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Allergens</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {ALLERGENS.map((allergen) => (
            <label key={allergen} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={option.allergens.includes(allergen)}
                onChange={() => handleAllergenToggle(allergen)}
                disabled={disabled}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700">{allergen}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Nutrition Information */}
      <div className="mt-4">
        <h5 className="text-sm font-medium text-gray-700 mb-3">Nutrition Information</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(option.nutrition).map(([key, value]) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={value}
                onChange={(e) => handleNutritionChange(key as keyof Nutrition, parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
