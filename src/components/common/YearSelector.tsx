import { useState } from "react";

interface YearSelectorProps {
  initialYear?: number;
  onYearChange?: (year: number) => void;
}

export default function YearSelector({
  initialYear = new Date().getFullYear(),
  onYearChange,
}: YearSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const years = Array.from({ length: 10 }, (_, i) => initialYear - 5 + i);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setIsOpen(false);
    if (onYearChange) {
      onYearChange(year);
    }
  };

  const handlePrevYear = () => {
    const newYear = selectedYear - 1;
    handleYearChange(newYear);
  };

  const handleNextYear = () => {
    const newYear = selectedYear + 1;
    handleYearChange(newYear);
  };

  return (
    <div className="relative flex items-center justify-center gap-4 py-4">
      <button
        onClick={handlePrevYear}
        className="text-2xl font-bold text-gray-500 hover:text-gray-700"
      >
        &#x3C;
      </button>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-2xl font-bold"
        >
          {selectedYear}
          <span className="text-sm">▼</span>
        </button>

        {isOpen && (
          <div className="absolute top-full z-10 mt-1 w-32 rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="max-h-48 overflow-y-auto py-1">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                    year === selectedYear ? "bg-gray-100" : ""
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleNextYear}
        className="text-2xl font-bold text-gray-500 hover:text-gray-700"
      >
        &#x3E;
      </button>
    </div>
  );
}
