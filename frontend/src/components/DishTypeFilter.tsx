interface DishTypeFilterProps {
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
}

export default function DishTypeFilter({ value, options, onChange }: DishTypeFilterProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(item => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">Dish Type</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => toggleOption(option)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="ml-3 text-sm text-gray-600 capitalize">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
