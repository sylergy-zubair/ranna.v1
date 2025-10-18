import { useState, useEffect } from 'react';
import { MoreInfoModalProps } from '@/types';
import { formatPrice, getSpiceLevelInfo } from '@/utils/dataUtils';

export default function MoreInfoModal({ dish, isOpen, onClose }: MoreInfoModalProps) {
  console.log('MoreInfoModal render:', { isOpen, dish: dish?.dish_title });
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  
  // Reset selected option when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOptionIndex(0);
    }
  }, [isOpen]);
  
  if (!isOpen || !dish) return null;

  const spiceInfo = getSpiceLevelInfo(dish.spice_level);
  const selectedOption = dish.options[selectedOptionIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{dish.dish_title}</h2>
              <div className="flex items-center mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${spiceInfo.bgColor} ${spiceInfo.color}`}>
                  {spiceInfo.label}
                </span>
                
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Option Selection Buttons */}
          {dish.options.length > 1 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Select Option:</h3>
              <div className="flex flex-wrap gap-2">
                {dish.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOptionIndex(index)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      selectedOptionIndex === index
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.option_name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          

          

          {/* Selected Option Details */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-2xl font-semibold text-gray-800 mb-2">{selectedOption.option_name}</h4>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {selectedOption.calorie_range} calories
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedOption.dish_type.map((type, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600">
                  {formatPrice(selectedOption.price)}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 text-base mb-3">{selectedOption.short_description}</p>
              <p className="text-gray-700 text-base leading-relaxed">{selectedOption.detailed_description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Ingredients */}
              <div>
                <h5 className="text-lg font-medium text-gray-700 mb-3">Ingredients</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedOption.ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergens */}
              <div>
                <h5 className="text-lg font-medium text-gray-700 mb-3">Allergens</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedOption.allergens.map((allergen, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-sm ${
                        allergen === 'None' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {allergen === 'None' ? 'No Allergens' : allergen}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Nutrition Info */}
            <div className="pt-6 border-t border-gray-200">
              <h5 className="text-lg font-medium text-gray-700 mb-4">Nutrition (per serving)</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{selectedOption.nutrition.energy_kj}</div>
                  <div className="text-gray-600 text-sm">Energy (kJ)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{selectedOption.nutrition.energy_kcal}</div>
                  <div className="text-gray-600 text-sm">Energy (kcal)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{selectedOption.nutrition.fat}g</div>
                  <div className="text-gray-600 text-sm">Fat</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{selectedOption.nutrition.of_which_saturates}g</div>
                  <div className="text-gray-600 text-sm">of which saturates</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{selectedOption.nutrition.carbohydrate}g</div>
                  <div className="text-gray-600 text-sm">Carbohydrate</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{selectedOption.nutrition.of_which_sugars}g</div>
                  <div className="text-gray-600 text-sm">of which sugars</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{selectedOption.nutrition.protein}g</div>
                  <div className="text-gray-600 text-sm">Protein</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{selectedOption.nutrition.salt}g</div>
                  <div className="text-gray-600 text-sm">Salt</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{selectedOption.nutrition.total_weight_grams}g</div>
                  <div className="text-gray-600 text-sm">Total Weight</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800">
              {formatPrice(selectedOption.price)}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
