interface CategoryButtonFilterProps {
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
}

export default function CategoryButtonFilter({ value, options, onChange }: CategoryButtonFilterProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(item => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              value.includes(option)
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
