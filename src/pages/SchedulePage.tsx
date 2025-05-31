import DaySelector from "../components/common/DaySelector";
import { useState, useEffect, useMemo } from "react";
import MonthSelector from "../components/common/MonthSelector";
import { homeApi } from "../api/home/apis";
import { calendarGamesDetailDto, recentResultsDto } from "../types/home";
import {
  getEnglishTeamName,
  getTeamNameByIdx,
  getTeamLogoByIdx,
} from "../hooks/TeamNameChanger";
import { format } from "date-fns";
import { Stadiums } from "../types/Stadium";
import { aiApi } from "../api/ai/apis";
import { AIPredictionResponse } from "../types/ai";

// 구장 이름 매핑 테이블
const STADIUM_NAME_MAP: Record<string, string> = {
  "서울종합운동장 야구장": "잠실야구장",
  "서울종합운동장 야구장 (두산)": "잠실야구장",
  "서울종합운동장 야구장 (LG)": "잠실야구장",
  인천SSG랜더스필드: "인천SSG랜더스필드",
  대구삼성라이온즈파크: "대구삼성라이온즈파크",
  수원KT위즈파크: "수원KT위즈파크",
  광주기아챔피언스필드: "광주기아챔피언스필드",
  대전한화생명볼파크: "대전 한화생명 볼파크",
};

interface BaseGame {
  time: string;
  homeTeam: {
    name: string;
    logo: string;
    idx?: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    idx?: number;
  };
  status: {
    text: string;
    type: "종료" | "진행중" | "진행전";
  };
  stadiumName: string;
  prediction?: {
    homeWinPercent: number;
    awayWinPercent: number;
  };
}

interface PastGame extends BaseGame {
  result: {
    homeScore: number;
    awayScore: number;
  };
}

interface FutureGame extends BaseGame {
  prediction?: {
    homeWinPercent: number;
    awayWinPercent: number;
  };
}

// schedule?date=2025-04-01 형식으로 변경.
export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarData, setCalendarData] =
    useState<calendarGamesDetailDto | null>(null);
  const [recentResults, setRecentResults] = useState<recentResultsDto | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<AIPredictionResponse | null>(
    null,
  );

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();

  // 과거 날짜인지 확인
  const isPastDate = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(selectedDate);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  }, [selectedDate]);

  // API 호출
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (isPastDate) {
          // 과거 날짜인 경우 경기 결과 조회
          const formattedDate = format(selectedDate, "yyyy-MM-dd");
          const data = await homeApi.getRecentResults(formattedDate);
          setRecentResults(data);
          setCalendarData(null);
          setPredictions(null);
        } else {
          // 오늘 이후 날짜인 경우 예정된 경기 조회
          const [calendarData, predictionData] = await Promise.all([
            homeApi.getCalendarGames(year, month, day),
            aiApi.getWinProbability(format(selectedDate, "yyyy-MM-dd")),
          ]);
          setCalendarData(calendarData);
          setPredictions(predictionData);
          setRecentResults(null);
        }
      } catch (error) {
        console.error("데이터 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [year, month, day, isPastDate, selectedDate]);

  // 선택된 날짜의 경기 정보
  const games = useMemo(() => {
    if (isPastDate && recentResults) {
      // 과거 경기 결과
      return recentResults.results.map(
        game =>
          ({
            time: format(new Date(game.scheduledAt), "HH:mm"),
            homeTeam: {
              name: getTeamNameByIdx(game.homeTeamIdx),
              logo: getTeamLogoByIdx(game.homeTeamIdx),
            },
            awayTeam: {
              name: getTeamNameByIdx(game.awayTeamIdx),
              logo: getTeamLogoByIdx(game.awayTeamIdx),
            },
            status: {
              text: "경기 종료",
              type: "종료",
            },
            stadiumName:
              Stadiums.find(s => s.mappingNumber === game.homeTeamIdx)?.name ||
              "구장",
            result: {
              homeScore: game.homeScore,
              awayScore: game.awayScore,
            },
          }) as PastGame,
      );
    }

    if (!calendarData) return [];

    const dayData = calendarData.days.find(d => d.day === day);
    if (!dayData) return [];

    return dayData.games.map(game => {
      const prediction = predictions?.find(
        p =>
          p.homeTeamIdx === game.homeTeamName &&
          p.awayTeamIdx === game.awayTeamName,
      );

      return {
        time: game.startTime,
        homeTeam: {
          name: game.homeTeamName,
          logo: `/images/${getEnglishTeamName(game.homeTeamName).toLowerCase()}_big_emb.png`,
          idx: game.homeTeamIdx,
        },
        awayTeam: {
          name: game.awayTeamName,
          logo: `/images/${getEnglishTeamName(game.awayTeamName).toLowerCase()}_big_emb.png`,
          idx: game.awayTeamIdx,
        },
        status: {
          text:
            new Date(
              `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${game.startTime}`,
            ) < new Date()
              ? "경기 종료"
              : "경기 전",
          type:
            new Date(
              `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${game.startTime}`,
            ) < new Date()
              ? "종료"
              : "진행전",
        },
        stadiumName: STADIUM_NAME_MAP[game.stadiumName] || game.stadiumName,
        prediction: prediction
          ? {
              homeWinPercent: Math.round(prediction.winProbability),
              awayWinPercent: Math.round(100 - prediction.winProbability),
            }
          : undefined,
      } as FutureGame;
    });
  }, [calendarData, recentResults, predictions, year, month, day, isPastDate]);

  return (
    <>
      <div className="mx-auto max-w-[1080px] px-4 py-8">
        <MonthSelector
          initialDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <DaySelector
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <span className="text-gray-500">로딩 중...</span>
            </div>
          ) : games.length === 0 ? (
            <div className="flex h-32 items-center justify-center">
              <span className="text-gray-500">
                해당 날짜에 예정된 경기가 없습니다.
              </span>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-[120px] px-6 py-3 text-left text-sm font-medium text-gray-500">
                    경기 시작 시간
                  </th>
                  <th className="w-[400px] px-6 py-3 text-center text-sm font-medium text-gray-500">
                    팀 / 경기장
                  </th>
                  <th className="w-[120px] px-6 py-3 text-right text-sm font-medium text-gray-500">
                    {isPastDate ? "경기 결과" : "승부 예측"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {games.map((game, index) => (
                  <tr key={index}>
                    <td className="w-[120px] px-6 py-4 whitespace-nowrap">
                      <div className="text-xl font-medium text-gray-700">
                        {game.time}
                      </div>
                    </td>
                    <td className="w-[400px] px-6 py-4">
                      <div className="grid grid-cols-3 items-center">
                        <div className="flex items-center justify-end gap-2">
                          <img
                            src={game.homeTeam.logo}
                            alt={game.homeTeam.name}
                            className="h-12 w-12"
                          />
                          <span className="text-lg font-medium text-gray-900">
                            {game.homeTeam.name.split(" ")[0]}
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <span
                            className={`w-full text-center text-sm ${
                              game.status.type === "진행중"
                                ? "text-orange-500"
                                : game.status.type === "종료"
                                  ? "text-green-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {game.status.text}
                          </span>
                          <span className="text-xs text-gray-500">
                            {game.stadiumName}
                          </span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <span className="text-lg font-medium text-gray-900">
                            {game.awayTeam.name.split(" ")[0]}
                          </span>
                          <img
                            src={game.awayTeam.logo}
                            alt={game.awayTeam.name}
                            className="h-12 w-12"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="w-[120px] px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end">
                        {isPastDate &&
                        "result" in game &&
                        (game as PastGame).result ? (
                          <span className="text-xl font-medium text-gray-900">
                            {(game as PastGame).result.homeScore} :{" "}
                            {(game as PastGame).result.awayScore}
                          </span>
                        ) : game.prediction ? (
                          <div className="flex min-w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-[#e3d6e8] to-[#d6d8e8] px-4 py-1">
                            <span
                              className={`t-h3 mr-2 ${game.prediction.homeWinPercent > game.prediction.awayWinPercent ? "font-bold text-[#222]" : "font-normal text-[#bbb]"}`}
                            >
                              {game.prediction.homeWinPercent}%
                            </span>
                            <span
                              className={`t-h3 ${game.prediction.awayWinPercent > game.prediction.homeWinPercent ? "font-bold text-[#222]" : "font-normal text-[#bbb]"}`}
                            >
                              {game.prediction.awayWinPercent}%
                            </span>
                          </div>
                        ) : (
                          <span
                            className={`text-sm font-medium ${game.status.type === "진행중" ? "text-orange-500" : game.status.type === "종료" ? "text-green-600" : "text-gray-600"}`}
                          >
                            {game.status.text}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
