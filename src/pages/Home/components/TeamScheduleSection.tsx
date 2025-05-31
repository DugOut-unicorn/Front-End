import { useState, useMemo, useEffect } from "react";
import { CalendarSearch, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { homeApi, getEnglishTeamName } from "../../../api/home/apis";
import { calendarGamesDetailDto } from "../../../types/home";

export function TeamScheduleSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [calendarData, setCalendarData] =
    useState<calendarGamesDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // API는 1-12월 사용

  // API 호출
  useEffect(() => {
    const fetchCalendarData = async () => {
      setIsLoading(true);
      try {
        // cheeringTeamIdx 5번으로 고정
        const cheeringTeamIdx = await homeApi.getEntryBanner();
        const data = await homeApi.getCalendarGames(
          year,
          month,
          undefined,
          cheeringTeamIdx[0].cheeringTeamId,
        );
        setCalendarData(data);
      } catch (error) {
        console.error("캘린더 데이터 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendarData();
  }, [year, month]);

  // 주 단위로 그룹화된 날짜 배열을 memoize
  const weeks = useMemo<Date[][]>(() => {
    // 1) 현재 달의 첫날
    const firstDayOfMonth = new Date(year, month - 1, 1); // month - 1 (0-11 사용)
    // 2) 그 주의 일요일(달력 시작)
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

    // 3) 현재 달의 마지막 날
    const lastDayOfMonth = new Date(year, month, 0); // month (1-12 사용)
    // 4) 그 주의 토요일(달력 끝)
    const endDay = new Date(lastDayOfMonth);
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

    // 5) startDay~endDay 사이를 주 단위로 그룹화
    const wks: Date[][] = [];
    let week: Date[] = [];
    const cursor = new Date(startDay);

    while (cursor <= endDay) {
      week.push(new Date(cursor));
      if (week.length === 7 || cursor.getDay() === 6) {
        wks.push(week);
        week = [];
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    if (week.length) wks.push(week);

    return wks;
  }, [year, month]);

  // 선택된 날짜의 경기 정보 조회
  const selectedGames = useMemo(() => {
    if (!selectedDate || !calendarData) return [];

    const day = selectedDate.getDate();
    const dayData = calendarData.days.find(d => d.day === day);
    return dayData?.games || [];
  }, [selectedDate, calendarData]);

  // 경기가 있는 날짜 Set
  const gameDates = useMemo(() => {
    if (!calendarData) return new Set<string>();

    const dates = calendarData.days.map(day => {
      const date = new Date(year, month - 1, day.day);
      return date.toDateString();
    });
    return new Set(dates);
  }, [calendarData, year, month]);

  // 월 전환 핸들러
  const changeMonth = (delta: number) => {
    const newDate = new Date(year, month - 1 + delta, 1);
    setCurrentDate(newDate);
    setSelectedDate(undefined);
  };

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="h-[620px] w-[497px] flex-1 bg-[var(--surface-2)]">
      {/* 헤더 */}
      <div className="mb-2 flex items-center gap-2">
        <CalendarSearch size={24} className="text-[var(--on-surface-grey1)]" />
        <h3 className="t-h3 text-[var(--on-surface-grey1)]">
          우리팀 경기 일정
        </h3>
      </div>
      <p className="t-body1 mb-3 text-[var(--on-surface-grey1)]">
        응원하는 팀의 경기 일정을 한 눈에 확인할 수 있어요.
      </p>

      <div className="flex h-[552px] w-[497px] flex-col rounded-lg border border-[#E5EAF2] bg-white p-3">
        {/* Month header */}
        <div className="mb-4 flex h-[40px] items-center justify-between px-1">
          <button
            onClick={() => changeMonth(-1)}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] border border-[var(--divider-dv2)]"
            disabled={isLoading}
          >
            <ChevronLeft
              size={24}
              className="text-[var(--on-surface-default)]"
            />
          </button>
          <span className="t-body1 text-[var(--on-surface-default)]">
            {format(currentDate, "LLLL yyyy")}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] border border-[var(--divider-dv2)]"
            disabled={isLoading}
          >
            <ChevronRight
              size={24}
              className="text-[var(--on-surface-default)]"
            />
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid h-[20px] grid-cols-7 text-center text-xs font-medium text-[var(--on-surface-grey1)]">
          {dayNames.map(dn => (
            <div key={dn}>{dn}</div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-[repeat(7,64px)] grid-rows-[repeat(6,52px)] gap-1">
          {weeks.map(week =>
            week.map(day => {
              const isCurrentMonth = day.getMonth() === month - 1;
              const isSelected =
                selectedDate?.toDateString() === day.toDateString();
              const hasGame = gameDates.has(day.toDateString());

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`relative flex h-full w-full items-center justify-center rounded ${
                    isCurrentMonth
                      ? "text-[var(--on-surface-default)]"
                      : "text-[var(--on-surface-grey2)]"
                  } ${
                    isSelected
                      ? "bg-[var(--surface-3)]"
                      : "hover:bg-[var(--surface-3)]"
                  } `}
                  disabled={isLoading}
                >
                  {day.getDate()}
                  {hasGame && (
                    <span className="absolute bottom-0 h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </button>
              );
            }),
          )}
        </div>

        {/* 선택된 날짜의 경기 정보 */}
        {selectedDate ? (
          <div className="mt-2 flex w-full flex-col gap-1 rounded-[8px] border border-[var(--divider-dv2)] bg-[var(--surface-1)] p-1">
            {selectedGames.length > 0 ? (
              selectedGames.map(game => (
                <div
                  key={game.gameIdx}
                  className="flex h-23 flex-col items-center justify-center rounded-lg bg-white p-2"
                >
                  {/* 상단: 팀 로고, 이름, 상태 */}
                  <div className="mb-3 flex items-center justify-center gap-4">
                    {/* 홈팀: 이름 - 로고 */}
                    <div className="flex items-center gap-1">
                      <span className="t-footnote">{game.homeTeamName}</span>
                      <img
                        src={`/images/${getEnglishTeamName(game.homeTeamName)}_big_emb.png`}
                        alt={game.homeTeamName}
                        className="h-9 w-9 rounded-full border border-[var(--divider-dv2)]"
                      />
                    </div>
                    {/* 상태 */}
                    <span className="t-footnote rounded-full bg-gray-100 px-3 py-1 text-[var(--on-surface-grey1)]">
                      {(() => {
                        const gameDate = new Date(selectedDate);
                        const [hours, minutes] = game.startTime
                          .split(":")
                          .map(Number);
                        gameDate.setHours(hours, minutes);
                        return gameDate < new Date() ? "종료" : "예정";
                      })()}
                    </span>
                    {/* 어웨이팀: 로고 - 이름 */}
                    <div className="flex items-center gap-1">
                      <img
                        src={`/images/${getEnglishTeamName(game.awayTeamName)}_big_emb.png`}
                        alt={game.awayTeamName}
                        className="h-9 w-9 rounded-full border border-[var(--divider-dv2)]"
                      />
                      <span className="t-footnote">{game.awayTeamName}</span>
                    </div>
                  </div>
                  {/* 하단: 날짜, 시간, 구장 */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="t-footnote mt-0.5 text-center text-[var(--on-surface-default)]">
                      {selectedDate.getDate()}일 오후 {game.startTime}
                    </div>
                    <div className="t-footnote mt-0.5 text-center text-[var(--on-surface-default)]">
                      {game.stadiumName}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-23 items-center justify-center rounded-lg bg-white p-2">
                <span className="t-footnote text-[var(--on-surface-grey2)]">
                  예정된 경기 일정이 없어요
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-2 flex h-25 items-center justify-center rounded-[8px] border border-[var(--divider-dv2)] bg-[var(--surface-1)] p-1">
            <span className="t-footnote text-[var(--on-surface-grey2)]">
              날짜를 선택해주세요
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
