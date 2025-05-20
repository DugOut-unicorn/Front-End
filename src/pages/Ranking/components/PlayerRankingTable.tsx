import { useState } from "react";

// interface PlayerData {
//   rank: number;
//   name: string;
//   team: string;
//   position: string;
//   stats: {
//     avg?: number;
//     fip?: number;
//     whip?: number;
//     war?: number;
//     os?: number;
//     games?: number;
//     wins?: number;
//     losses?: number;
//     saves?: number;
//     holds?: number;
//   };
// }

export default function PlayerRankingTable() {
  const [selectedCategory, setSelectedCategory] = useState<"투수" | "타자">(
    "투수",
  );

  const categories = {
    투수: [
      "평균자책",
      "FIP",
      "WHIP",
      "WAR",
      "OS",
      "경기",
      "승",
      "패",
      "세이브",
      "홀드",
    ],
    타자: [
      "타율",
      "홈런",
      "타점",
      "도루",
      "출루율",
      "OPS",
      "장타율",
      "득점",
      "안타",
      "2루타",
    ],
  };

  const mockPlayers = Array.from({ length: 15 }, (_, i) => ({
    rank: i + 1,
    name: "양정섭",
    team: "삼성",
    position: "투수",
    stats: {
      avg: 0.0,
      fip: 2.92,
      whip: 0.4,
      war: 0.31,
      os: 0,
      games: 1,
      wins: 0,
      losses: 0,
      saves: 0,
      holds: 0,
    },
  }));

  return (
    <div>
      <div className="mt-4 mb-4 flex gap-2">
        <button
          className={`rounded-full px-4 py-1 ${
            selectedCategory === "투수"
              ? "bg-blue-900 text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setSelectedCategory("투수")}
        >
          투수
        </button>
        <button
          className={`rounded-full px-4 py-1 ${
            selectedCategory === "타자"
              ? "bg-blue-900 text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setSelectedCategory("타자")}
        >
          타자
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {mockPlayers.slice(0, 5).map((player, groupIndex) => (
          <div key={groupIndex} className="bg-gray-50 p-4">
            <div className="mb-2 text-sm text-gray-500">다승</div>
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">1</span>
                <img
                  src={`images/${player.name.toLowerCase()}.png`}
                  alt={player.name}
                  className="h-12 w-10"
                />
                <div>
                  <div className="font-bold">{player.name}</div>
                  <div className="text-sm text-gray-500">{player.team}</div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="grid grid-cols-[1fr_40px]">
                <div className="flex items-center gap-2">
                  <span className="text-sm">1</span>
                  <span className="text-sm">{player.name}</span>
                  <span className="text-sm text-gray-500">{player.team}</span>
                </div>
                <span className="text-right text-sm">1승</span>
              </div>
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_40px]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">1</span>
                    <span className="text-sm">{player.name}</span>
                    <span className="text-sm text-gray-500">{player.team}</span>
                  </div>
                  <span className="text-right text-sm">1승</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <table className="w-full">
          <thead>
            <tr className="border-y border-gray-200 text-sm">
              <th className="p-3 text-center">순위</th>
              <th className="p-3 text-left">선수명</th>
              <th className="p-3 text-center">팀</th>
              {categories[selectedCategory].map(cat => (
                <th key={cat} className="p-3 text-center">
                  {cat}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockPlayers.map(player => (
              <tr
                key={player.rank}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3 text-center">{player.rank}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span>{player.name}</span>
                  </div>
                </td>
                <td className="p-3 text-center">{player.team}</td>
                {Object.values(player.stats).map((stat, index) => (
                  <td key={index} className="p-3 text-center">
                    {typeof stat === "number" ? stat.toFixed(2) : stat}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
