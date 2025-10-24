import Image from 'next/image';

interface SpiceLevelFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export default function SpiceLevelFilter({ value, onChange }: SpiceLevelFilterProps) {
  const spiceLevels = [
    { level: 1, label: 'None', chilis: 1 },
    { level: 2, label: 'Medium', chilis: 2 },
    { level: 3, label: 'Hot', chilis: 3 },
    { level: 4, label: 'Very Hot', chilis: 4 },
    { level: 5, label: 'Extreme', chilis: 5 }
  ];

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">Spice Level</h3>
      <div className="space-y-2">
        {spiceLevels.map(({ level, chilis }) => (
          <label key={level} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="spiceLevel"
              value={level}
              checked={value === level}
              onChange={() => onChange(value === level ? null : level)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
              value === level 
                ? 'border-orange-500 bg-orange-500' 
                : 'border-gray-300'
            }`}>
              {value === level && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {/* Chili Images */}
              {level === 1 ? (
                <Image
                  src="/data/img/no-chili.png"
                  alt="no chili"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              ) : (
                Array.from({ length: chilis }, (_, index) => (
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
          </label>
        ))}
      </div>
    </div>
  );
}
