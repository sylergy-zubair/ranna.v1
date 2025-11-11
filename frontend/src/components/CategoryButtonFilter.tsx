interface CategoryButtonFilterProps {
  activeCategory: string | null;
  options: string[];
  onSelect: (category: string | null) => void;
}

export default function CategoryButtonFilter({ activeCategory, options, onSelect }: CategoryButtonFilterProps) {
  const toggleOption = (option: string) => {
    if (activeCategory === option) {
      onSelect(null);
      return;
    }

    onSelect(option);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
              activeCategory === option
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
