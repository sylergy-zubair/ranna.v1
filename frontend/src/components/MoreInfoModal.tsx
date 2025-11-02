import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MoreInfoModalProps } from '@/types';
import { formatPrice } from '@/utils/dataUtils';

export default function MoreInfoModal({ dish, isOpen, onClose }: MoreInfoModalProps) {
  console.log('MoreInfoModal render:', { isOpen, dish: dish?.dish_title });
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullIngredients, setShowFullIngredients] = useState(false);
  
  // Helper functions for text truncation
  const truncateText = (text: string, maxLines: number = 2) => {
    const words = text.split(' ');
    const wordsPerLine = 8; // Approximate words per line
    const maxWords = maxLines * wordsPerLine;
    
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const shouldTruncate = (text: string, maxLines: number = 2) => {
    const words = text.split(' ');
    const wordsPerLine = 8;
    const maxWords = maxLines * wordsPerLine;
    return words.length > maxWords;
  };
  
  // Reset selected option when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOptionIndex(0);
    }
  }, [isOpen]);
  
  if (!isOpen || !dish) return null;

  // const spiceInfo = getSpiceLevelInfo(dish.spice_level);
  const selectedOption = dish.options[selectedOptionIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Top Section - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Left Column - Image */}
          <div className="space-y-4">
            <div className="relative w-full h-80 bg-[#f5f5f5] rounded-lg overflow-hidden">
              {dish.image_url ? (
                <Image
                  src={dish.image_url}
                  alt={dish.dish_title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>No image available</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Dish Details */}
          <div className="space-y-4">
            {/* Dish Title */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-2xl font-bold text-gray-800">{dish.dish_title}</h2>
            </div>

            {/* Available Options */}
            {dish.options.length > 1 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Available Options:</h3>
                <div className="flex flex-wrap gap-2">
                  {dish.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOptionIndex(index)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        selectedOptionIndex === index
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {option.option_name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-md font-bold text-gray-600">
                {formatPrice(selectedOption.price)}
              </div>
            </div>

            {/* Spice Level and Allergens */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  {/* Chili Images */}
                  {dish.spice_level === 1 ? (
                    <Image
                      src="/data/img/0chili.png"
                      alt="no chili"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  ) : (
                    Array.from({ length: dish.spice_level }, (_, index) => (
                      <Image
                        key={index}
                        src="/data/img/image.png"
                        alt="chili"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedOption.allergens.map((allergen, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-full text-xs ${
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

            {/* Short Description */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{selectedOption.short_description}</p>
            </div>
          </div>
        </div>

        {/* Middle Section - Nutritional Information */}
        <div className="border-t border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Nutrition (per 100g)</h3>
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

        {/* Bottom Section - Detailed Description */}
        <div className="border-t border-gray-200 p-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {showFullDescription 
                ? selectedOption.detailed_description 
                : truncateText(selectedOption.detailed_description)
              }
            </p>
            {shouldTruncate(selectedOption.detailed_description) && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
              >
                {showFullDescription ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="border-t border-gray-200 p-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ingredients</h3>
            <div className="text-gray-700 leading-relaxed">
              {selectedOption.ingredients && selectedOption.ingredients.length > 0 ? (
                <div>
                  <p>
                    {showFullIngredients 
                      ? selectedOption.ingredients.join(', ')
                      : truncateText(selectedOption.ingredients.join(', '))
                    }
                  </p>
                  {shouldTruncate(selectedOption.ingredients.join(', ')) && (
                    <button
                      onClick={() => setShowFullIngredients(!showFullIngredients)}
                      className="mt-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      {showFullIngredients ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">No ingredients information available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
