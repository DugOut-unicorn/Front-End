// src/pages/Matching/MatchingGameListPage.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MonthSelector from "../../components/common/MonthSelector";
import DaySelector from "../../components/common/DaySelector";
import axios from "axios";

// ────────────────────────────────────────────────────────────
// 1) API 응답 타입 정의 (필요에 따라 수정하세요)
interface ApiGame {
  gameIdx: number;
  homeTeamName: string;
  awayTeamName: string;
  stadiumName: string;
  startTime: string; // "HH:mm"
}

interface ApiDay {
  day: number;
  games: ApiGame[];
}

interface ApiCalendarResp {
  year: number;
  month: number;
  days: ApiDay[];
}

// ────────────────────────────────────────────────────────────
// 2) 화면에서 사용할 Game 타입
interface Game {
  gameIdx: number;
  homeTeamName: string;
  awayTeamName: string;
  stadiumName: string;
  startTime: string;
}

// ────────────────────────────────────────────────────────────
// Helper: Date 객체 → "YYYY-MM" 문자열 (예: "2023-06")
const toMonthString = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1;
  return `${yyyy}-${mm < 10 ? "0" + mm : mm}`;
};

export default function MatchingGameListPage() {
  // 1) 날짜 선택 상태
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 2) 해당 날짜의 경기 목록
  const [gamesForTheDay, setGamesForTheDay] = useState<Game[]>([]);

  // 3) API 호출 중 로딩 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 네비게이트 훅
  const navigate = useNavigate();

  // ────────────────────────────────────────────────────────────
  // useEffect: selectedDate가 바뀔 때마다, 해당 월/일로 API 호출 (cheeringTeamIdx 없이)
  useEffect(() => {
    const fetchCalendarGames = async () => {
      setIsLoading(true);
      try {
        // ex) "2023-06"
        const monthStr = toMonthString(selectedDate);
        // ex) 19
        const dayInt = selectedDate.getDate();

        // GET /home/calendar-games?month=2023-06&day=19
        const response = await axios.get<ApiCalendarResp>(
          "/home/calendar-games",
          {
            params: {
              month: monthStr,
              day: dayInt,
              // cheeringTeamIdx 파라미터를 빼고 호출 → 해당 날짜의 모든 경기 반환
            },
          }
        );
        const data = response.data;

        // days 배열 중에서 day === dayInt인 객체를 찾기
        const todayObj = data.days.find((d) => d.day === dayInt);
        if (todayObj && todayObj.games) {
          // ApiGame[] → Game[] 형태로 매핑
          const mapped: Game[] = todayObj.games.map((g) => ({
            gameIdx: g.gameIdx,
            homeTeamName: g.homeTeamName,
            awayTeamName: g.awayTeamName,
            stadiumName: g.stadiumName,
            startTime: g.startTime,
          }));
          setGamesForTheDay(mapped);
        } else {
          setGamesForTheDay([]);
        }
      } catch (err) {
        console.error("캘린더 API 호출 실패:", err);
        setGamesForTheDay([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendarGames();
  }, [selectedDate]);

  // ────────────────────────────────────────────────────────────
  // helper: Date → "YYYY-MM-DD" 포맷 문자열
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  // ────────────────────────────────────────────────────────────
  // 클릭 시 navigate 함수
  const handleClick = (dateStr: string, homeKey: string, gameIdx: number) => {
    // 예시 URL: /matching/list/2023-06-19/lg/1234
    navigate(`/matching/list/${dateStr}/${homeKey}/${gameIdx}`);
  };

  // ────────────────────────────────────────────────────────────
  // 렌더링
  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8">
      {/* 1. Month selector with arrows */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        
        <MonthSelector
          initialDate={selectedDate}
          onDateChange={setSelectedDate}
        />

      </div>

      {/* 2. Day selector (날짜 달력 그리드) */}
      <DaySelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* 3. API 호출 중 로딩 표시 */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">로딩 중...</div>
      ) : (
        <>
          {/* 4. 선택된 날짜의 경기 리스트 테이블 */}
          <div className="overflow-hidden rounded-xl bg-white shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    경기 정보
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    시작 시간
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {gamesForTheDay.length > 0 ? (
                  gamesForTheDay.map((g, i) => {
                    // 홈팀 이름을 “LG 트윈스” → “lg” 같은 키로 변환 (예시)
                    const homeKey = g.homeTeamName.split(" ")[0].toLowerCase();
                    const bg = i % 2 === 0 ? "" : "bg-gray-50";
                    const dateStr = fmt(selectedDate);

                    return (
                      <tr
                        key={g.gameIdx}
                        className={`${bg} hover:bg-gray-100 cursor-pointer`}
                        onClick={() =>
                          handleClick(dateStr, homeKey, g.gameIdx)
                        }
                      >
                        {/* 경기 정보 셀 */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-6">
                            {/* 홈팀 이름 */}
                            <span className="text-base font-medium text-gray-900">
                              {g.homeTeamName.split(" ")[0]}
                            </span>
                            {/* 구장 */}
                            <span className="text-sm text-gray-500">
                              {g.stadiumName}
                            </span>
                            {/* 어웨이팀 이름 */}
                            <span className="text-base font-medium text-gray-900">
                              {g.awayTeamName.split(" ")[0]}
                            </span>
                          </div>
                        </td>
                        {/* 시작 시간 셀 */}
                        <td className="px-6 py-4 text-right">
                          <span className="text-base font-medium text-gray-900">
                            {g.startTime}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="py-8 text-center text-gray-500"
                    >
                      예정된 경기 일정이 없어요
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
