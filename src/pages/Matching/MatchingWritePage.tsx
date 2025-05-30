// src/pages/MatchingWritePage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
        onChange={e => onChange(e.target.value)}
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
        onChange={e => onChange(e.target.value)}
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
            hasTicket === true
              ? 'bg-black text-white'
              : 'bg-white text-gray-700'
          }`}
          onClick={() => setHasTicket(true)}
        >
          O
        </button>
        <button
          type="button"
          className={`flex-1 rounded border border-gray-300 px-4 py-2 text-sm ${
            hasTicket === false
              ? 'bg-black text-white'
              : 'bg-white text-gray-700'
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
        onChange={e => setDate(e.target.value)}
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
        onChange={e => setGame(e.target.value)}
      >
        <option value="">예정 날짜의 경기를 선택해 주세요.</option>
        {options.map(opt => (
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hasTicket, setHasTicket] = useState<boolean | null>(null);
  const [date, setDate] = useState('');
  const [game, setGame] = useState('');

  const gameOptions = [
    { id: '1', label: 'KT vs LG (06/19)' },
    { id: '2', label: '두산 vs NC (06/20)' },
  ];

  const handleVerifyTicket = () => {
    // TODO: 티켓 인증 API 호출
    alert('티켓 인증 요청');
  };

  const handleSubmit = () => {
    // TODO: 유효성 검사 후 API 호출
    console.log({ title, content, hasTicket, date, game });
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
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6 py-6 px-4"
      >
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
          type="submit"
          className="w-full rounded bg-black py-3 text-white hover:bg-gray-900"
        >
          매칭 글 등록하기
        </button>
      </form>
    </div>
  );
}
