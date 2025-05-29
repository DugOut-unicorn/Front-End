import { useState, useEffect } from "react";
import { rankingApi } from "../../../api/ranking/apis";

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

interface PlayerCardData {
  playerName: string;
  backNumber: number;
  playerImageUrl: string;
  value: string | number;
}

const CARD_CONFIG = [
  {
    title: "다승",
    fetch: rankingApi.getRankPitcherWinRate,
    valueKey: "wpct",
    valueLabel: "승률",
  },
  {
    title: "평균자책",
    fetch: rankingApi.getRankPitcherEra,
    valueKey: "era",
    valueLabel: "ERA",
  },
  {
    title: "탈삼진",
    fetch: rankingApi.getRankPitcherSo,
    valueKey: "so",
    valueLabel: "탈삼진",
  },
  {
    title: "세이브",
    fetch: rankingApi.getRankPitcherSv,
    valueKey: "sv",
    valueLabel: "세이브",
  },
];

export default function PlayerRankingTable() {
  const [cardData, setCardData] = useState<PlayerCardData[][]>([
    [],
    [],
    [],
    [],
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          CARD_CONFIG.map(async (card, idx) => {
            const data = await card.fetch();
            // valueKey에 따라 값 포맷팅
            return data.slice(0, 3).map((item: any) => ({
              playerName: item.playerName,
              backNumber: item.backNumber,
              playerImageUrl: item.playerImageUrl,
              value:
                card.valueKey === "wpct"
                  ? (item.wpct * 100).toFixed(1) + "%"
                  : card.valueKey === "era"
                    ? item.era.toFixed(2)
                    : item[card.valueKey],
            }));
          }),
        );
        setCardData(results);
      } catch (e) {
        setCardData([[], [], [], []]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

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

      <div className="grid grid-cols-4 gap-4">
        {CARD_CONFIG.map((card, idx) => (
          <div key={card.title} className="bg-gray-50 p-4">
            <div className="mb-2 text-sm text-gray-500">{card.title}</div>
            {loading ? (
              <div className="text-center">로딩 중...</div>
            ) : cardData[idx].length === 0 ? (
              <div className="text-center text-gray-400">데이터 없음</div>
            ) : (
              <>
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">1</span>
                    <img
                      src={cardData[idx][0]?.playerImageUrl}
                      alt={cardData[idx][0]?.playerName}
                      className="h-12 w-10 object-cover"
                    />
                    <div>
                      <div className="font-bold">
                        {cardData[idx][0]?.playerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        #{cardData[idx][0]?.backNumber}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  {cardData[idx].map((player, i) => (
                    <div key={i} className="grid grid-cols-[1fr_40px]">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{i + 1}</span>
                        <span className="text-sm">{player.playerName}</span>
                        <span className="text-sm text-gray-500">
                          #{player.backNumber}
                        </span>
                      </div>
                      <span className="text-right text-sm">{player.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
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
