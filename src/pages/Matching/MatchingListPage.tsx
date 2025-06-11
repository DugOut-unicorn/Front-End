// src/pages/Matching/MatchingListPage.tsx

import { useState, useEffect, ReactNode } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getEnglishTeamName } from "../../hooks/TeamNameChanger";

// ────────────────────────────────────────────────────────────
// API DTOs
interface MatchingPostDto {
  matchingPostIdx: number;
  nickname: string;     // ← Swagger 예시에 맞춰 `nickname`
  title: string;
  context: string;
  haveTicket: boolean;
  isMatched: boolean;
  createdAt: string;
}

interface ApiGame {
  gameIdx: number;
  homeTeamName: string;
  awayTeamName: string;
  stadiumName: string;
  startTime: string;
}
interface CalendarGamesDay {
  day: number;
  games: ApiGame[];
}
interface CalendarGamesResponse {
  days: CalendarGamesDay[];
}
// ────────────────────────────────────────────────────────────

export default function MatchingListPage() {
  const { date, team, gameIdx } = useParams<{
    date: string;
    team: string;
    gameIdx: string;
  }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page") || "0";
  const [currentPage, setCurrentPage] = useState<number>(
    Number(pageParam) + 1
  );

  const [listData, setListData] = useState<MatchingPostDto[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 검색어 하이라이트
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ─── Selected Game 정보 ────────────────────────────────────
  const [selectedGame, setSelectedGame] = useState<ApiGame | null>(null);
  useEffect(() => {
    if (!date || !gameIdx) {
      setSelectedGame(null);
      return;
    }
    const [yyyy, mm, dd] = date.split("-");
    axios
      .get<CalendarGamesResponse>("/home/calendar-games", {
        params: { month: `${yyyy}-${mm}`, day: Number(dd) },
      })
      .then((resp) => {
        const today = resp.data.days.find((d) => d.day === Number(dd));
        const game = today?.games.find(
          (g) => String(g.gameIdx) === String(gameIdx)
        );
        setSelectedGame(game ?? null);
      })
      .catch(() => {
        setSelectedGame(null);
      });
  }, [date, gameIdx]);

  // 로고 + 시간 계산
  const homeLogoUrl = selectedGame
    ? `/images/${getEnglishTeamName(selectedGame.homeTeamName)}_emb.png`
    : "";
  const awayLogoUrl = selectedGame
    ? `/images/${getEnglishTeamName(selectedGame.awayTeamName)}_emb.png`
    : "";
  const startTime = selectedGame?.startTime ?? "";

  // ─── Matching Posts 조회 ────────────────────────────────────
  useEffect(() => {
    if (!gameIdx) return;
    setIsLoading(true);
    setErrorMsg(null);

    axios
      .get<MatchingPostDto[]>(`/matching-post/by-game/${gameIdx}`, {
        params: { page: currentPage - 1 },
      })
      .then((res) => {
        setListData(res.data);
        setTotalPages(1);
      })
      .catch(() => {
        setErrorMsg("게시글을 불러오는 중 오류가 발생했습니다.");
        setListData([]);
        setTotalPages(1);
      })
      .finally(() => setIsLoading(false));
  }, [gameIdx, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    navigate({
      pathname: `/matching/list/${date}/${team}/${gameIdx}`,
      search: `?page=${page - 1}`,
    });
  };
  const handleWriteClick = () => navigate("/matching/write");
  const handleRowClick = (idx: number) =>
    navigate(`/matching/articles/${idx}`);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 하이라이트 함수
  function highlightText(text: string, highlight: string): ReactNode {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8">
      {/* 상단: 경기 로고 + VS + 시간 */}
      {selectedGame && (
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center space-x-8">
            <img
              src={homeLogoUrl}
              alt={selectedGame.homeTeamName}
              className="h-12 w-12 rounded-full border"
              onError={(e) =>
                (e.currentTarget.src = "/images/default_team_emb.png")
              }
            />
            <span className="text-2xl font-bold text-gray-700">VS</span>
            <img
              src={awayLogoUrl}
              alt={selectedGame.awayTeamName}
              className="h-12 w-12 rounded-full border"
              onError={(e) =>
                (e.currentTarget.src = "/images/default_team_emb.png")
              }
            />
          </div>
          <span className="mt-2 text-sm text-gray-500">{startTime}</span>
        </div>
      )}

      {/* 필터 / 검색 / 제안 버튼 */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <select
          className="rounded border px-4 py-2"
          value={team ?? ""}
          onChange={(e) =>
            navigate(`/matching/list/${date}/${e.target.value}/${gameIdx}`)
          }
        >
          <option value="" disabled>
            응원 팀 선택
          </option>
          {selectedGame && (
            <>
              <option value={selectedGame.homeTeamName}>
                {selectedGame.homeTeamName}
              </option>
              <option value={selectedGame.awayTeamName}>
                {selectedGame.awayTeamName}
              </option>
            </>
          )}
        </select>

        <div className="relative flex-1">
          <input
            type="text"
            className="w-full rounded border px-4 py-2 pr-10"
            placeholder="검색어 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <button
          className="rounded-md border px-4 py-2 hover:bg-gray-50"
          onClick={handleWriteClick}
        >
          매칭 제안하기
        </button>
      </div>

      {/* 목록 / 테이블 / 페이지네이션 */}
      {isLoading && <p className="text-center py-8 text-gray-500">로딩 중...</p>}
      {errorMsg && <p className="text-center py-8 text-red-500">{errorMsg}</p>}
      {!isLoading && !errorMsg && listData.length === 0 && (
        <p className="text-center py-8 text-gray-500">
          해당 게임에 대한 매칭 글이 없습니다.
        </p>
      )}

      {!isLoading && !errorMsg && listData.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-[80px] px-6 py-3 text-center text-sm font-medium text-gray-500">
                  글 번호
                </th>
                <th className="w-[120px] px-6 py-3 text-left text-sm font-medium text-gray-500">
                  작성자
                </th>
                <th className="w-[400px] px-6 py-3 text-left text-sm font-medium text-gray-500">
                  제목
                </th>
                <th className="w-[80px] px-6 py-3 text-center text-sm font-medium text-gray-500">
                  티켓
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {listData.map((item) => (
                <tr
                  key={item.matchingPostIdx}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(item.matchingPostIdx)}
                >
                  <td className="px-6 py-4 text-center whitespace-nowrap text-gray-700">
                    {item.matchingPostIdx}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {item.nickname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {highlightText(item.title, searchTerm)}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-gray-700">
                    {item.haveTicket ? "O" : "X"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !errorMsg && totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <ul className="flex items-center gap-4 text-gray-600">
            <li>
              <button
                onClick={() =>
                  goToPage(currentPage > 1 ? currentPage - 1 : 1)
                }
                disabled={currentPage === 1}
                className={`px-4 py-2 text-lg ${
                  currentPage === 1
                    ? "cursor-default text-gray-300"
                    : "hover:text-black"
                }`}
              >
                &lt;
              </button>
            </li>
            {pageNumbers.map((page) => (
              <li key={page}>
                <button
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 text-lg ${
                    currentPage === page
                      ? "font-bold text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  goToPage(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-lg ${
                  currentPage === totalPages
                    ? "cursor-default text-gray-300"
                    : "hover:text-black"
                }`}
              >
                &gt;
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
