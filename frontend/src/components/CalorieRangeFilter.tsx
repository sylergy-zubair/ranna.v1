interface CalorieRangeFilterProps {
  value: string | null;
  options: string[];
  onChange: (value: string | null) => void;
}

export default function CalorieRangeFilter({ value, options, onChange }: CalorieRangeFilterProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">Calorie Range</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="calorieRange"
              value={option}
              checked={value === option}
              onChange={() => onChange(value === option ? null : option)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
              value === option 
                ? 'border-orange-500 bg-orange-500' 
                : 'border-gray-300'
            }`}>
              {value === option && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className={`text-sm ${value === option ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>
              {option} calories
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
