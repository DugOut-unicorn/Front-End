// src/pages/Matching/MatchingWritePage.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

// ────────────────────────────────────────────────────────────
// (옵션) API로 전송할 데이터 타입 정의 (타입스크립트용)
interface CreateMatchingPostRequest {
  title: string;
  context: string;
  haveTicket: boolean;
  gameIdx: number;
}
// (옵션) API 응답 타입 정의
interface CreateMatchingPostResponse {
  postIdx: number;
  message: string;
}
// 달력 API에서 내려주는 형태 (필드 중 우리는 day와 games 배열만 사용)
interface CalendarGamesDay {
  day: number;
  games: {
    gameIdx: number;
    homeTeamName: string;
    awayTeamName: string;
    startTime: string;
  }[];
}
interface CalendarGamesResponse {
  days: CalendarGamesDay[];
}
// ────────────────────────────────────────────────────────────

function WriteTitleInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block font-medium">제목</label>
      <input
        type="text"
        placeholder="매칭 글 제목을 입력해 주세요."
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function WriteContentInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <label className="mb-1 block font-medium">매칭 글</label>
      <textarea
        rows={5}
        placeholder="글 내용을 자유롭게 입력해 주세요."
        className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute bottom-1 right-2 text-xs text-gray-400">
        {value.length} / 300
      </div>
    </div>
  );
}

function TicketSelector({
  hasTicket,
  setHasTicket,
  onVerify,
}: {
  hasTicket: boolean | null;
  setHasTicket: (b: boolean) => void;
  onVerify: () => void;
}) {
  return (
    <div>
      <label className="mb-1 block font-medium">티켓 보유 여부</label>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          className={`flex-1 rounded border border-gray-300 px-4 py-2 text-sm ${
            hasTicket === true ? "bg-black text-white" : "bg-white text-gray-700"
          }`}
          onClick={() => setHasTicket(true)}
        >
          O
        </button>
        <button
          type="button"
          className={`flex-1 rounded border border-gray-300 px-4 py-2 text-sm ${
            hasTicket === false ? "bg-black text-white" : "bg-white text-gray-700"
          }`}
          onClick={() => setHasTicket(false)}
        >
          X
        </button>
      </div>
      {hasTicket && (
        <button
          type="button"
          className="rounded border border-gray-300 px-4 py-1 text-sm"
          onClick={onVerify}
        >
          티켓 인증하기
        </button>
      )}
    </div>
  );
}

function GameDatePicker({
  date,
  setDate,
}: {
  date: string;
  setDate: (d: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block font-medium">경기 날짜 선택</label>
      <input
        type="date"
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
}

function GameSelector({
  game,
  setGame,
  options,
}: {
  game: string;
  setGame: (g: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1 block font-medium">경기 선택</label>
      <select
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      >
        <option value="">예정 날짜의 경기를 선택해 주세요.</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function MatchingWritePage() {
  const navigate = useNavigate();

  // ────────────────────────────────────────────────────────────
  // 폼 상태
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [hasTicket, setHasTicket] = useState<boolean | null>(null);
  const [date, setDate] = useState<string>(""); // "YYYY-MM-DD"
  const [game, setGame] = useState<string>(""); // 선택된 gameIdx(문자열)

  // 실제 백엔드에서 받아온 gameIdx 목록
  const [gameOptions, setGameOptions] = useState<{ id: string; label: string }[]>([]);

  // ────────────────────────────────────────────────────────────
  // 1) “날짜(date)”가 선택될 때마다 백엔드에서 해당 날짜의 모든 경기 목록을 가져오기
  useEffect(() => {
    if (!date) {
      setGameOptions([]); // 날짜가 비어 있으면 옵션 초기화
      return;
    }

    const [yyyy, mm, dd] = date.split("-");
    const monthParam = `${yyyy}-${mm}`;
    const dayParam = parseInt(dd, 10);

    const fetchGames = async () => {
      try {
        // cheeringTeamIdx 파라미터 없이 호출 → 해당 날짜에 열리는 모든 경기 반환
        const resp = await axios.get<CalendarGamesResponse>("/home/calendar-games", {
          params: {
            month: monthParam,
            day: dayParam
          },
        });
        const todayObj = resp.data.days.find((d) => d.day === dayParam);
        if (todayObj) {
          const opts = todayObj.games.map((g) => ({
            id: String(g.gameIdx),
            label: `${g.homeTeamName} vs ${g.awayTeamName} (${g.startTime})`,
          }));
          setGameOptions(opts);
        } else {
          setGameOptions([]);
        }
      } catch (e) {
        console.error("달력 API 호출 실패:", e);
        setGameOptions([]);
      }
    };

    fetchGames();
  }, [date]);

  // ────────────────────────────────────────────────────────────
  // 티켓 인증 (더미)
  const handleVerifyTicket = () => {
    alert("티켓 인증 요청(구현 필요)");
  };

  // ────────────────────────────────────────────────────────────
  // 매칭 글 등록 제출 처리
  const handleSubmit = async () => {
    // 1) 유효성 검사
    if (!title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }
    if (hasTicket === null) {
      alert("티켓 보유 여부를 선택해 주세요.");
      return;
    }
    if (!date) {
      alert("경기 날짜를 선택해 주세요.");
      return;
    }
    if (!game) {
      alert("경기를 선택해 주세요.");
      return;
    }

    // 2) 요청 바디 생성 (스펙에 맞춰 정확히 보내기)
    const body: CreateMatchingPostRequest = {
      title: title.trim(),
      context: content.trim(),
      haveTicket: hasTicket,
      gameIdx: parseInt(game, 10), // 반드시 숫자 타입(정수)로
    };

    try {
      // (예시) 로컬 스토리지에 저장된 JWT 토큰 꺼내기
      const token = localStorage.getItem("jwtToken") || "";

      // 3) POST /matching-post API 호출 (Authorization 헤더 포함)
      const response = await axios.post<CreateMatchingPostResponse>(
        "/matching-post",
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      // 4) 성공 시 반환된 postIdx로 상세 페이지로 이동
      const { postIdx } = response.data;
      alert("매칭 글이 성공적으로 등록되었습니다.");
      navigate(`/matching/articles/${postIdx}`);
    } catch (error) {
      console.error("매칭 글 등록 실패:", error);
      alert("매칭 글 등록 중 오류가 발생했습니다. 서버 로그를 확인해 주세요.");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      {/* 헤더 */}
      <header className="flex items-center border-b py-4 px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span className="font-semibold text-lg">매칭 글 작성하기</span>
        </button>
      </header>

      {/* 폼 */}
      <div className="space-y-6 py-6 px-4">
        <WriteTitleInput value={title} onChange={setTitle} />
        <WriteContentInput value={content} onChange={setContent} />

        <TicketSelector
          hasTicket={hasTicket}
          setHasTicket={setHasTicket}
          onVerify={handleVerifyTicket}
        />

        <GameDatePicker date={date} setDate={setDate} />
        <GameSelector game={game} setGame={setGame} options={gameOptions} />

        <button
          type="button"
          className="w-full rounded bg-black py-3 text-white hover:bg-gray-900"
          onClick={handleSubmit}
        >
          매칭 글 등록하기
        </button>
      </div>
    </div>
  );
}
