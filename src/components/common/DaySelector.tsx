import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface DaySelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DaySelector({
  selectedDate,
  onDateChange,
}: DaySelectorProps) {
  // 날짜 배열 생성 (선택된 날짜 기준 전후 5일)
  const getDates = () => {
    const dates = [];
    for (let i = -5; i <= 5; i++) {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // 이전/다음 날짜 이동
  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    onDateChange(newDate);
  };

  // 날짜 선택 핸들러
  const handleDateSelect = (date: Date) => {
    // 선택된 날짜가 현재 표시된 월과 다른 경우
    if (date.getMonth() !== selectedDate.getMonth()) {
      onDateChange(date);
    } else {
      onDateChange(date);
    }
  };

  // 요일 변환
  const getDayText = (date: Date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[date.getDay()];
  };

  // 경기가 없는 날인지 확인 (임시로 월요일만 체크)
  const isNoGameDay = (date: Date) => {
    return date.getDay() === 1; // 1은 월요일
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[1080px] items-center justify-between py-4">
        <button
          onClick={handlePrevDay}
          className="rounded-full p-1.5 hover:bg-gray-100"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </button>

        <div className="flex justify-center space-x-12">
          {getDates().map(date => {
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            const hasNoGame = isNoGameDay(date);
            const isDifferentMonth =
              date.getMonth() !== selectedDate.getMonth();

            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelect(date)}
                className={`flex min-w-[48px] flex-col items-center ${
                  isSelected
                    ? "border-b-2 border-green-600 text-green-600"
                    : hasNoGame
                      ? "text-gray-400"
                      : isDifferentMonth
                        ? "text-gray-400"
                        : "text-gray-900"
                }`}
              >
                <span className="text-sm font-medium">{getDayText(date)}</span>
                <span className="text-xl font-bold">{date.getDate()}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNextDay}
          className="rounded-full p-1.5 hover:bg-gray-100"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
