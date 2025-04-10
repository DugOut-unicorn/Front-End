import { useState } from "react";

export default function MonthlyNavigation() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(3);

  const handlePrev = () => {
    if (month === 1) {
      setYear(prev => prev - 1);
      setMonth(12);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (month === 12) {
      setYear(prev => prev + 1);
      setMonth(1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  return (
    <div className="flex items-center justify-between my-4 text-lg font-semibold">
      <span>{year} 시즌기록</span>
      <div className="flex items-center gap-4">
        <button className="text-xl" onClick={handlePrev}>
          &lt;
        </button>
        <span className="text-xl font-bold">{month}월</span>
        <button className="text-xl" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}
