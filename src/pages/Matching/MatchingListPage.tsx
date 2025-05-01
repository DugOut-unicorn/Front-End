import React, { useState } from "react";
import { MatchData } from "../../types/Type";
import { useNavigate } from "react-router-dom";
// 예시 더미 데이터 (실제 데이터는 API나 부모 컴포넌트에서 받아옴)
const DUMMY_DATA: MatchData[] = [
  {
    id: 1,
    writer: "홍길동",
    team: "LG 트윈스",
    title: "20일 함께 응원할 분 구합니다.",
    hasTicket: true,
  },
  {
    id: 2,
    writer: "김철수",
    team: "두산 베어스",
    title: "티켓 같이 구매하실 분 있으신가요?",
    hasTicket: false,
  },
  {
    id: 3,
    writer: "이영희",
    team: "롯데 자이언츠",
    title: "매칭글 제목 예시입니다.",
    hasTicket: true,
  },
  {
    id: 4,
    writer: "박민수",
    team: "LG 트윈스",
    title: "응원 동행 구합니다.",
    hasTicket: false,
  },
  {
    id: 5,
    writer: "정해인",
    team: "두산 베어스",
    title: "티켓 보유자 매칭 부탁드립니다.",
    hasTicket: true,
  },
  {
    id: 6,
    writer: "오상진",
    team: "SSG 랜더스",
    title: "매칭글 제목입니다.",
    hasTicket: false,
  },
  {
    id: 7,
    writer: "김하늘",
    team: "롯데 자이언츠",
    title: "응원 동행 구합니다.",
    hasTicket: true,
  },
  {
    id: 8,
    writer: "이동현",
    team: "LG 트윈스",
    title: "매칭글 예시입니다.",
    hasTicket: true,
  },
  {
    id: 9,
    writer: "최민식",
    team: "두산 베어스",
    title: "매칭글 제목 예시입니다.",
    hasTicket: false,
  },
  {
    id: 10,
    writer: "홍길동",
    team: "SSG 랜더스",
    title: "응원 동행 구합니다.",
    hasTicket: true,
  },
  {
    id: 11,
    writer: "박지성",
    team: "두산 베어스",
    title: "추가 예시 글입니다.",
    hasTicket: true,
  },
  {
    id: 12,
    writer: "이영수",
    team: "LG 트윈스",
    title: "또 다른 매칭글입니다.",
    hasTicket: false,
  },
];

export default function MatchingList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10; // 한 페이지에 표시할 항목 수를 10개로 설정

  const totalCount = DUMMY_DATA.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const pageData = DUMMY_DATA.slice(startIndex, startIndex + pageSize);

  const navigate = useNavigate(); // 추가

  const handleClick = () => {
    navigate(`/write`); // 상대경로로 변경: /matching/list로 이동
  };

  const handlePageClick = (id: number) => {
    navigate(`/article/${id}`); // 매칭글 상세 페이지로 이동
  };

  // 페이지 번호 배열 (1부터 totalPages까지)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8">
      {/* 상단 필터 및 매칭글 작성 영역 (디자인만 보여줌) */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          {/* 응원하는 팀 필터 (기능은 구현하지 않음) */}
          <select
            className="rounded border px-4 py-2"
            defaultValue=""
            // onChange={() => {}} // 기능 구현 제거; 디자인만 남김
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

          {/* 티켓 보유 여부 필터 (기능은 구현하지 않음) */}
          <select
            className="rounded border px-4 py-2"
            defaultValue=""
            // onChange={() => {}}
          >
            <option value="">티켓 보유 여부</option>
            <option value="O">O</option>
            <option value="X">X</option>
          </select>

          {/* 검색어 입력 (기능은 구현하지 않음) */}
          <div className="relative">
            <input
              type="text"
              className="w-[200px] rounded border px-4 py-2 pr-10"
              placeholder="검색어 입력"
              defaultValue=""
              // onChange={() => {}}
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

        {/* 매칭글 작성하기 버튼 */}
        <button
          className="rounded-md border px-4 py-2 hover:bg-gray-50"
          onClick={() => handleClick()} // 클릭 시 매칭글 작성 페이지로 이동
        >
          매칭글 작성하기
        </button>
      </div>

      {/* 테이블 영역 */}
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
              <th className="w-[150px] px-6 py-3 text-left text-sm font-medium text-gray-500">
                응원하는 팀
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
            {pageData.length > 0 ? (
              pageData.map(item => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50"
                  onClick={() => handlePageClick(item.id)}
                >
                  <td className="px-6 py-4 text-center whitespace-nowrap text-gray-700">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {item.writer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <img
                        src={`/images/${item.team.replace(" ", "").toLowerCase()}_emb.png`}
                        alt={item.team}
                        className="h-8 w-8 object-contain"
                      />
                      <span className="text-base font-medium text-gray-900">
                        {item.team}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-gray-700">
                    {item.hasTicket ? "O" : "X"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  등록된 매칭글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이징 영역 */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <ul className="flex items-center gap-4 text-gray-600">
            {/* 이전 버튼 */}
            <li>
              <button
                onClick={() =>
                  setCurrentPage(prev => (prev > 1 ? prev - 1 : prev))
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
            {pageNumbers.map(page => (
              <li key={page}>
                <button
                  onClick={() => setCurrentPage(page)}
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
                onClick={() =>
                  setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev))
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
