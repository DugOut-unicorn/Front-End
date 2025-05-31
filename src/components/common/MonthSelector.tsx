import { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface MonthSelectorProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
}

export default function MonthSelector({
  initialDate = new Date(),
  onDateChange,
}: MonthSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  // initialDate가 변경될 때 selectedDate 업데이트
  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  const handleMonthChange = (newDate: Date) => {
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    handleMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    handleMonthChange(newDate);
  };

  // 달력 데이터 생성
  const generateCalendarData = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    const weeks = [];

    // 이전 달의 날짜들
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDate - i,
        isCurrentMonth: false,
        isSelectable: false,
      });
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= lastDate; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        isSelectable: true,
      });
    }

    // 다음 달의 날짜들
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: i,
          isCurrentMonth: false,
          isSelectable: false,
        });
      }
    }

    // 주 단위로 분할
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 상단 월 선택 바 */}
      <div className="flex w-full items-center justify-center gap-4 px-4 py-2">
        <button
          onClick={handlePrevMonth}
          className="text-gray-600 hover:text-gray-800"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-2xl font-bold text-gray-900"
        >
          {selectedDate.getFullYear()}.
          {String(selectedDate.getMonth() + 1).padStart(2, "0")}
        </button>
        <button
          onClick={handleNextMonth}
          className="text-gray-600 hover:text-gray-800"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      {/* 달력 모달 */}
      {isOpen && (
        <div className="absolute top-12 right-0 left-0 z-50 mx-auto w-[400px] rounded-lg bg-white p-4 shadow-lg">
          {/* 모달 헤더 */}
          <div className="relative mb-4 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="text-gray-600 hover:text-gray-800"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <span className="text-2xl font-bold text-gray-900">
                {selectedDate.getFullYear()}.
                {String(selectedDate.getMonth() + 1).padStart(2, "0")}
              </span>
              <button
                onClick={handleNextMonth}
                className="text-gray-600 hover:text-gray-800"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-0 text-gray-600 hover:text-gray-800"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* 요일 헤더 */}
          <div className="mb-2 grid grid-cols-7 text-center">
            {["일", "월", "화", "수", "목", "금", "토"].map(day => (
              <div key={day} className="text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* 달력 그리드 */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarData()
              .flat()
              .map((day, index) => (
                <button
                  key={index}
                  disabled={!day.isSelectable}
                  className={`flex aspect-square items-center justify-center text-lg font-medium ${
                    day.isCurrentMonth
                      ? "text-gray-900 hover:bg-gray-100"
                      : "text-gray-400"
                  }`}
                >
                  {day.date}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
