import { useState } from "react";
import { CalendarSearch, ChevronLeft, ChevronRight } from "lucide-react";
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
    date: new Date(2025, 5, 19),
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
    <div className="h-[620px] w-[497px] flex-1 bg-[var(--surface-2)]">
      <div className="mb-2 flex items-center gap-2">
        <CalendarSearch size={24} className="text-[var(--on-surface-grey1)]" />
        <h3 className="t-h3 text-[var(--on-surface-grey1)]">
          우리팀 경기 일정
        </h3>
      </div>
      <p className="t-body1 mb-3 text-[var(--on-surface-grey1)]">
        응원하는 팀의 경기 일정을 한 눈에 확인할 수 있어요.
      </p>
      {/* 캘린더 컴포넌트 */}
      <div className="h-[552px] w-[497px] rounded-lg border border-[#E5EAF2] bg-white p-3">
        {/* Month header */}
        <div className="mb-4 flex h-[40px] w-[465px] items-center justify-between px-1">
          <button
            onClick={() => {
              const prev = new Date(month.getFullYear(), month.getMonth() - 1);
              onMonthChange?.(prev);
            }}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] border border-[var(--divider-dv2)]"
          >
            <ChevronLeft
              size={24}
              className="text-[var(--on-surface-default)]"
            />
          </button>
          <span className="t-body1 text-[var(--on-surface-default)]">
            {format(month, "LLLL yyyy")}
          </span>
          <button
            onClick={() => {
              const next = new Date(month.getFullYear(), month.getMonth() + 1);
              onMonthChange?.(next);
            }}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] border border-[var(--divider-dv2)]"
          >
            <ChevronRight
              size={24}
              className="text-[var(--on-surface-default)]"
            />
          </button>
        </div>
        {/* 캘린더 */}
        <DayPicker
          mode="single"
          showOutsideDays={true}
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={month}
          onMonthChange={onMonthChange}
          modifiers={{ gameDay: gameDates }}
          formatters={{ formatCaption: () => "" }}
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
          className="mb-[10px] w-[465px] flex-1"
        />
        {/* 선택된 날짜의 경기 정보 */}
        {selectedDate &&
          (selectedGame ? (
            <div className="flex w-[465px] items-center justify-between rounded-[8px] border border-[var(--divider-dv2)] bg-[var(--surface-1)]">
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
              <div className="flex flex-row items-center gap-2">
                <div className="t-footnote text-[var(--on-surface-default)]">
                  {format(selectedDate, "d")}일 {selectedGame.time} (
                </div>
                <div className="t-footnote text-[var(--on-surface-grey1)]">
                  {selectedGame.place})
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex h-[106px] w-[465px] items-center justify-center rounded-[8px] border border-[var(--divider-dv2)] bg-[var(--surface-1)]">
              <span className="t-footnote text-[var(--on-surface-grey2)]">
                예정된 경기 일정이 없어요
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
