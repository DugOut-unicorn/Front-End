// src/pages/Matching/MatchingWritePage.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackHeader from "../Profile/components/BackHeader"; // 뒤로가기 재사용 컴포넌트

// ────────────────────────────────────────────────────────────
// 요청/응답 타입 정의
interface CreateMatchingPostRequest {
  title: string;
  context: string;
  haveTicket: boolean;
  gameIdx: number;
}
interface CreateMatchingPostResponse {
  postIdx: number;
  message: string;
}
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

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [hasTicket, setHasTicket] = useState<boolean | null>(null);
  const [date, setDate] = useState<string>("");
  const [game, setGame] = useState<string>("");
  const [gameOptions, setGameOptions] = useState<{ id: string; label: string }[]>([]);

  // 날짜 선택 시 경기 목록 불러오기
  useEffect(() => {
    if (!date) {
      setGameOptions([]);
      return;
    }
    const [yyyy, mm, dd] = date.split("-");
    const monthParam = `${yyyy}-${mm}`;
    const dayParam = parseInt(dd, 10);

    (async () => {
      try {
        const resp = await axios.get<CalendarGamesResponse>("/home/calendar-games", {
          params: { month: monthParam, day: dayParam },
        });
        const today = resp.data.days.find((d) => d.day === dayParam);
        setGameOptions(
          today
            ? today.games.map((g) => ({
                id: String(g.gameIdx),
                label: `${g.homeTeamName} vs ${g.awayTeamName} (${g.startTime})`,
              }))
            : []
        );
      } catch {
        setGameOptions([]);
      }
    })();
  }, [date]);

  const handleVerifyTicket = () => {
    alert("티켓 인증 요청(구현 필요)");
  };

  const handleSubmit = async () => {
    if (!title.trim()) return alert("제목을 입력해 주세요.");
    if (!content.trim()) return alert("내용을 입력해 주세요.");
    if (hasTicket === null) return alert("티켓 보유 여부를 선택해 주세요.");
    if (!date) return alert("경기 날짜를 선택해 주세요.");
    if (!game) return alert("경기를 선택해 주세요.");

    const body: CreateMatchingPostRequest = {
      title: title.trim(),
      context: content.trim(),
      haveTicket: hasTicket,
      gameIdx: parseInt(game, 10),
    };

    try {
      const token = localStorage.getItem("jwtToken") || "";
      const res = await axios.post<CreateMatchingPostResponse>(
        "/matching-post",
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );
      alert("매칭 글이 성공적으로 등록되었습니다.");
      navigate(`/matching/articles/${res.data.postIdx}`);
    } catch (err) {
      console.error(err);
      alert("매칭 글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      {/* 뒤로가기 버튼 (뷰포트 기준 좌상단 고정) */}
      <div className="absolute top-4 left-4 z-10">
        <BackHeader title="매칭 글 작성하기" />
      </div>

      {/* 중앙 폼 컨테이너: space-y-6으로 섹션 간격 균일하게 */}
      <div className="mx-auto max-w-md pt-16 px-4 space-y-6">
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
