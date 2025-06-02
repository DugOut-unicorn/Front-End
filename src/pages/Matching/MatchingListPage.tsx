// src/pages/Matching/MatchingListPage.tsx

import { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";

// ────────────────────────────────────────────────────────────
// 1) Swagger 스펙에 맞춘 API 응답 DTO 타입 예시 (필요에 따라 수정하세요)
interface MatchingPostDto {
  matchingPostIdx: number;
  authorNickname: string;
  title: string;
  context: string;
  haveTicket: boolean;
  isMatched: boolean;
  createdAt: string; // 예: "2025-05-31T08:43:30.096Z"
}

// 2) 페이지네이션 메타+배열 형태로 내려오는 스펙 예시
//    실제 API 스펙에 맞춰 수정하세요.
interface MatchingListResponse {
  posts: MatchingPostDto[];
  totalPages: number;
  totalElements: number;
}
// ────────────────────────────────────────────────────────────

export default function MatchingListPage() {
  // 1) URL 파라미터로 넘어오는 date, team, gameIdx
  const { date, team, gameIdx } = useParams<{
    date: string;
    team: string;
    gameIdx: string;
  }>();
  const navigate = useNavigate();

  // 2) 쿼리스트링에서 page 값을 읽어옴 (백엔드 API가 0-indexed page를 기대한다고 가정)
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page") || "0";
  // 화면에 보여줄 때는 1-based page 번호로 사용
  const [currentPage, setCurrentPage] = useState<number>(
    Number(pageParam) + 1
  );

  // 3) API에서 받아온 매칭 글 목록 데이터
  const [listData, setListData] = useState<MatchingPostDto[]>([]);
  // 4) API 호출 중인 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 5) 에러 메시지
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // 6) 페이지네이션 메타에서 내려오는 전체 페이지 수
  const [totalPages, setTotalPages] = useState<number>(1);

  // ────────────────────────────────────────────────────────────
  // useEffect: gameIdx 또는 currentPage가 바뀔 때마다 API 호출
  useEffect(() => {
    const fetchMatchingPosts = async () => {
      if (!gameIdx) {
        setErrorMsg("유효한 게임 ID가 없습니다.");
        setListData([]);
        setTotalPages(1);
        return;
      }

      setIsLoading(true);
      setErrorMsg(null);

      try {
        // GET /matching-post/by-game/{gameIdx}?page={currentPage - 1}
        // (백엔드는 0-indexed 페이지를 기대한다고 가정)
        const response = await axios.get<MatchingListResponse | MatchingPostDto[]>(
          `/matching-post/by-game/${gameIdx}`,
          {
            params: {
              page: currentPage - 1,
            },
          }
        );

        const data = response.data;
        // ───────────────────────────────────────────────────────
        // (1) 만약 response.data가 배열(MatchingPostDto[])로 내려온다면
        if (Array.isArray(data)) {
          setListData(data as MatchingPostDto[]);
          setTotalPages(1);
        }
        // (2) response.data.posts 형태(메타+배열)로 내려온다면
        else if ((data as MatchingListResponse).posts !== undefined) {
          const typed = data as MatchingListResponse;
          setListData(typed.posts);
          setTotalPages(typed.totalPages);
        }
        // (3) 그 외의 예외: 빈 배열로 초기화
        else {
          setListData([]);
          setTotalPages(1);
        }
        // ───────────────────────────────────────────────────────
      } catch (err) {
        console.error("게임별 매칭 글 조회 실패:", err);
        setErrorMsg("게시글을 불러오는 중 오류가 발생했습니다.");
        setListData([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchingPosts();
  }, [gameIdx, currentPage]);

  // ────────────────────────────────────────────────────────────
  // “매칭 제안하기” 버튼 클릭 시
  const handleWriteClick = () => {
    navigate("/matching/write");
  };

  // 개별 게시글 클릭 시 상세 페이지로 이동
  const handleRowClick = (postIdx: number) => {
    navigate(`/matching/articles/${postIdx}`);
  };

  // 페이지 번호 클릭 시 호출
  const goToPage = (page: number) => {
    setCurrentPage(page);
    // URL 쿼리스트링에 ?page={page - 1} 반영
    navigate({
      pathname: `/matching/list/${date}/${team}/${gameIdx}`,
      search: `?page=${page - 1}`,
    });
  };

  // 페이지 번호 배열 생성 (1부터 totalPages까지)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // ────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8">
      {/* 상단 필터 및 매칭 제안하기 버튼 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          {/* 응원하는 팀 필터 (디자인만, 기능 제거) */}
          <select
            className="rounded border px-4 py-2"
            defaultValue=""
            disabled
          >
            <option value="">응원하는 팀</option>
            <option value="LG 트윈스">LG 트윈스</option>
            <option value="두산 베어스">두산 베어스</option>
            <option value="롯데 자이언츠">롯데 자이언츠</option>
            <option value="SSG 랜더스">SSG 랜더스</option>
            <option value="키움 히어로즈">키움 히어로즈</option>
            <option value="삼성 라이온즈">삼성 라이온즈</option>
            <option value="한화 이글스">한화 이글스</option>
            <option value="NC 다이노스">NC 다이노스</option>
            <option value="KIA 타이거즈">KIA 타이거즈</option>
            <option value="KT 위즈">KT 위즈</option>
          </select>

          {/* 티켓 보유 여부 필터 (디자인만) */}
          <select
            className="rounded border px-4 py-2"
            defaultValue=""
            disabled
          >
            <option value="">티켓 보유 여부</option>
            <option value="O">O</option>
            <option value="X">X</option>
          </select>

          {/* 검색어 입력 (디자인만) */}
          <div className="relative">
            <input
              type="text"
              className="w-[200px] rounded border px-4 py-2 pr-10"
              placeholder="검색어 입력"
              defaultValue=""
              disabled
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
        </div>

        {/* 매칭 제안하기 버튼 */}
        <button
          className="rounded-md border px-4 py-2 hover:bg-gray-50"
          onClick={handleWriteClick}
        >
          매칭 제안하기
        </button>
      </div>

      {/* 로딩 중 표시 */}
      {isLoading && (
        <p className="text-center py-8 text-gray-500">로딩 중...</p>
      )}

      {/* 에러 메시지 표시 */}
      {errorMsg && (
        <p className="text-center py-8 text-red-500">{errorMsg}</p>
      )}

      {/* 데이터가 비어 있을 때 */}
      {!isLoading && !errorMsg && listData.length === 0 && (
        <p className="text-center py-8 text-gray-500">
          해당 게임에 대한 매칭 글이 없습니다.
        </p>
      )}

      {/* 데이터가 있을 때 테이블 렌더링 */}
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
                  매칭글 제목
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
                    {item.authorNickname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {item.title}
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

      {/* 페이지네이션 UI */}
      {!isLoading && !errorMsg && totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <ul className="flex items-center gap-4 text-gray-600">
            {/* 이전 버튼 */}
            <li>
              <button
                onClick={() => goToPage(currentPage > 1 ? currentPage - 1 : 1)}
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
            {/* 페이지 번호 버튼들 */}
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
            {/* 다음 버튼 */}
            <li>
              <button
                onClick={() => goToPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
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
