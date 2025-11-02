import Image from 'next/image';
import { DishCardProps } from '@/types';
import { formatPrice } from '@/utils/dataUtils';

export default function DishCard({ dish, onMoreInfo }: DishCardProps) {
  // const spiceInfo = getSpiceLevelInfo(dish.spice_level);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden">
      {/* Image */}
      <div className="w-full h-48 bg-[#f5f5f5]">
        {dish.image_url ? (
          <Image
            src={dish.image_url}
            alt={dish.dish_title}
            width={300}
            height={192}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">No image available</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Header with title and spice level */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800">{dish.dish_title}</h3>
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

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {dish.description}
      </p>

      {/* Price and button */}
      <div className="flex justify-between items-center">
        <div className="flex items-baseline">
          <span className="text-sm text-gray-500 mr-1">from</span>
          <span className="text-mdfont-bold text-gray-600">
            {formatPrice(dish.lowestPrice)}
          </span>
        </div>
        <button
          onClick={() => onMoreInfo(dish)}
          className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
          style={{ backgroundColor: '#FF4036' }}
        >
          More Info
        </button>
      </div>

        {/* Option names as tags - only show if more than 1 option */}
        {dish.options.length > 1 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {dish.options.map((option, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {option.option_name}
              </span>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
