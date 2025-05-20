import DaySelector from "../../components/common/DaySelector";
import { useState } from "react";
import MonthSelector from "../../components/common/MonthSelector";
import { useNavigate } from "react-router-dom"; // 추가

interface Game {
  time: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  status: {
    text: string;
    type: "종료" | "진행중" | "진행전";
  };
  result?: {
    score?: string;
    winRate?: string;
    winner?: "home" | "away";
  };
}

// schedule?date=2025-04-01 형식으로 변경.
export default function MatchingGameListPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate(); // 추가

  const handleClick = (date: string, team: string) => {
    navigate(`/matching/list/${date}/${team}`); // 상대경로로 변경: /matching/list로 이동
  };

  // 임시 데이터
  const games: Game[] = [
    {
      time: "13:00",
      homeTeam: {
        name: "LG 트윈스",
        logo: "/images/lg_emb.png",
      },
      awayTeam: {
        name: "키움 히어로즈",
        logo: "/images/kiwoom_emb.png",
      },
      status: {
        text: "경기 종료",
        type: "종료",
      },
      result: {
        score: "4:3",
      },
    },
    {
      time: "13:00",
      homeTeam: {
        name: "LG 트윈스",
        logo: "/images/lg_emb.png",
      },
      awayTeam: {
        name: "키움 히어로즈",
        logo: "/images/kiwoom_emb.png",
      },
      status: {
        text: "경기 종료",
        type: "종료",
      },
      result: {
        score: "4:3",
      },
    },
    {
      time: "13:00",
      homeTeam: {
        name: "LG 트윈스",
        logo: "/images/lg_emb.png",
      },
      awayTeam: {
        name: "키움 히어로즈",
        logo: "/images/kiwoom_emb.png",
      },
      status: {
        text: "경기 중",
        type: "진행중",
      },
      result: {
        winRate: "72.3%",
        winner: "home",
      },
    },
    {
      time: "14:00",
      homeTeam: {
        name: "LG 트윈스",
        logo: "/images/lg_emb.png",
      },
      awayTeam: {
        name: "키움 히어로즈",
        logo: "/images/kiwoom_emb.png",
      },
      status: {
        text: "경기 전",
        type: "진행전",
      },
      result: {
        winRate: "52.3%",
        winner: "away",
      },
    },
    {
      time: "14:00",
      homeTeam: {
        name: "LG 트윈스",
        logo: "/images/lg_emb.png",
      },
      awayTeam: {
        name: "키움 히어로즈",
        logo: "/images/kiwoom_emb.png",
      },
      status: {
        text: "경기 전",
        type: "진행전",
      },
      result: {
        winRate: "52.3%",
        winner: "away",
      },
    },
  ];

  // const matchEntryData = {
  //   time: "13:00",
  //   homeTeamEmblem: "/images/lg_twins_emb.png",
  //   stadium: "잠실",
  //   awayTeamEmblem: "/images/kiwoom_heroes_emb.png",
  // };

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
                  글 목록
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
                    <div className="flex items-center justify-center space-x-4">
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
                      <span className="text-sm text-gray-500">잠실</span>
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
                    <button
                      onClick={() => handleClick("2025-04-15", "lg")} // 상대경로로 변경: /matching/list로 이동
                      className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
                    >
                      매칭글 보러가기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
