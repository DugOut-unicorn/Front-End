import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface TeamScheduleSectionProps {
  month: Date;
  onMonthChange?: (d: Date) => void;
}

// 임의의 mock 경기 데이터
const mockGames = [
  {
    date: new Date(2023, 5, 19),
    home: { name: "LG", logo: "/images/lg.svg" },
    away: { name: "한화", logo: "/images/hanwha.svg" },
    time: "오후 18:30",
    place: "대전",
  },
  // 필요시 더 추가
];

export function TeamScheduleSection({
  month,
  onMonthChange,
}: TeamScheduleSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // 선택된 날짜의 경기 정보 찾기
  const selectedGame = mockGames.find(
    g => selectedDate && g.date.toDateString() === selectedDate.toDateString(),
  );

  // 캘린더에 점 표시할 날짜
  const gameDates = mockGames.map(g => g.date);

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-[var(--surface-2)] p-6">
      <div className="mb-2 flex items-center">
        <CalendarIcon size={24} className="text-[var(--on-surface-grey1)]" />
        <h3 className="t-h3 ml-2 text-[var(--on-surface-grey1)]">
          우리팀 경기 일정
        </h3>
      </div>
      <p className="t-body1 mb-4 text-[var(--on-surface-grey1)]">
        응원하는 팀의 경기 일정을 한 눈에 확인할 수 있어요.
      </p>
      <div className="flex flex-1 flex-col rounded-lg bg-[var(--surface-1)] p-4">
        {/* 네비게이션 */}
        <div className="mb-2 flex items-center justify-between">
          <button
            onClick={() => {
              const prev = new Date(month.getFullYear(), month.getMonth() - 1);
              onMonthChange?.(prev);
            }}
          >
            <ChevronLeft size={20} className="text-[var(--on-surface-grey2)]" />
          </button>
          <span className="t-body1 text-[var(--on-surface-default)]">
            {format(month, "LLLL yyyy")}
          </span>
          <button
            onClick={() => {
              const next = new Date(month.getFullYear(), month.getMonth() + 1);
              onMonthChange?.(next);
            }}
          >
            <ChevronRight
              size={20}
              className="text-[var(--on-surface-grey2)]"
            />
          </button>
        </div>
        {/* 캘린더 */}
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={month}
          onMonthChange={onMonthChange}
          modifiers={{ gameDay: gameDates }}
          modifiersClassNames={{
            caption: "t-body1 font-medium",
            nav__button: "text-[var(--on-surface-grey2)]",
            head_row:
              "grid grid-cols-7 text-center t-body1 text-[var(--on-surface-grey2)]",
            row: "grid grid-cols-7",
            cell: "t-body1 flex items-center justify-center rounded-md hover:bg-[var(--surface-2)]",
            selected:
              "bg-[var(--accent-default)] text-[var(--on-accent-default)]",
            today: "text-[var(--accent-default)]",
            gameDay:
              "relative after:content-[''] after:block after:w-1.5 after:h-1.5 after:bg-[var(--accent-default)] after:rounded-full after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2",
          }}
          className="flex-1"
        />
        {/* 선택된 날짜의 경기 정보 */}
        {selectedDate && selectedGame && (
          <div className="mt-4 flex items-center justify-between rounded-lg bg-[var(--surface-2)] p-3">
            <div className="flex items-center space-x-3">
              <img
                src={selectedGame.home.logo}
                className="h-6 w-6"
                alt={selectedGame.home.name}
              />
              <span className="t-body1">{selectedGame.home.name}</span>
              <span className="t-body1">VS</span>
              <img
                src={selectedGame.away.logo}
                className="h-6 w-6"
                alt={selectedGame.away.name}
              />
              <span className="t-body1">{selectedGame.away.name}</span>
            </div>
            <div className="t-body1 text-[var(--on-surface-grey2)]">
              {format(selectedDate, "d")}일 {selectedGame.time} (
              {selectedGame.place})
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
