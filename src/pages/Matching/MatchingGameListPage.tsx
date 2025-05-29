// src/pages/Matching/MatchingGameListPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MonthSelector from "../../components/common/MonthSelector";
import DaySelector from "../../components/common/DaySelector";

interface Game {
  time: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  stadium: string;
}

export default function MatchingGameListPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const games: Game[] = [
    {
      time: "13:00",
      homeTeam: { name: "LG 트윈스", logo: "/images/lg_emb.png" },
      awayTeam: { name: "키움 히어로즈", logo: "/images/kiwoom_emb.png" },
      stadium: "잠실",
    },
    {
      time: "13:00",
      homeTeam: { name: "NC 다이노스", logo: "/images/nc_emb.png" },
      awayTeam: { name: "롯데 자이언츠", logo: "/images/lotte_emb.png" },
      stadium: "잠실",
    },
    {
      time: "14:00",
      homeTeam: { name: "기아 타이거즈", logo: "/images/kia_emb.png" },
      awayTeam: { name: "한화 이글스", logo: "/images/hanwha_emb.png" },
      stadium: "광주",
    },
  ];

  const handleClick = (date: string, team: string) => {
    navigate(`/matching/list/${date}/${team}`);
  };

  // helper: YYYY-MM-DD 포맷
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8">
      {/* 1. Month selector with arrows */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={() => {
            const prev = new Date(selectedDate);
            prev.setMonth(prev.getMonth() - 1);
            setSelectedDate(prev);
          }}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          ◀
        </button>
        <MonthSelector
          initialDate={selectedDate}
          onDateChange={setSelectedDate}
          className="text-lg font-medium text-gray-800"
        />
        <button
          onClick={() => {
            const next = new Date(selectedDate);
            next.setMonth(next.getMonth() + 1);
            setSelectedDate(next);
          }}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          ▶
        </button>
      </div>

      {/* 2. Day selector: 날짜 아래에만 파란 점 표시 (커스텀 렌더러) */}
      <DaySelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        className="mb-6"
        renderDay={(date, isSelected) => {
          const day = date.getDate();
          return (
            <div className="flex flex-col items-center w-8">
              <span
                className={`pb-1 ${
                  isSelected ? "text-blue-600 font-semibold" : "text-gray-600"
                }`}
              >
                {day}
              </span>
              {/* 파란 점 */}
              <div
                className={`h-1 w-1 rounded-full mt-0.5 ${
                  isSelected ? "bg-blue-600" : "bg-transparent"
                }`}
              />
            </div>
          );
        }}
      />

      {/* 3. 게임 리스트 카드 */}
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
            {games.map((g, i) => {
              const home = g.homeTeam.name.split(" ")[0];
              const away = g.awayTeam.name.split(" ")[0];
              const bg = i % 2 === 0 ? "" : "bg-gray-50";
              return (
                <tr
                  key={i}
                  className={`${bg} hover:bg-gray-100`}
                  onClick={() => handleClick(fmt(selectedDate), home.toLowerCase())}
                >
                  {/* 경기 정보 */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-6">
                      {/* 홈팀 */}
                      <div className="flex items-center space-x-1">
                        <img
                          src={g.homeTeam.logo}
                          alt={g.homeTeam.name}
                          className="h-10 w-10"
                        />
                        <span className="text-base font-medium text-gray-900">
                          {home}
                        </span>
                      </div>
                      {/* 구장 */}
                      <span className="text-sm text-gray-500">{g.stadium}</span>
                      {/* 어웨이 */}
                      <div className="flex items-center space-x-1">
                        <span className="text-base font-medium text-gray-900">
                          {away}
                        </span>
                        <img
                          src={g.awayTeam.logo}
                          alt={g.awayTeam.name}
                          className="h-10 w-10"
                        />
                      </div>
                    </div>
                  </td>
                  {/* 시작 시간 */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-base font-medium text-gray-900">
                      {g.time}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
