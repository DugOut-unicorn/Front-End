import { useState } from "react";
import YearSelector from "../../components/common/YearSelector";
import TeamRankingTable from "./components/TeamRankingTable";
import PlayerRankingTable from "./components/PlayerRankingTable";

export default function RankingPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState<"team" | "player">("team");

  // 임시 데이터 - 실제로는 API에서 가져올 데이터
  const mockRankings = Array.from({ length: 10 }, (_, index) => ({
    rank: index + 1,
    teamName: "LG",
    games: 7,
    wins: 7,
    losses: 7,
    draws: 7,
    winningPercentage: 0.872,
    gamesBehind: 0.0,
    streak: "3승",
    last10: "6승-1패-0무",
    runsScored: 0.252,
    runsAllowed: 3.86,
  }));

  return (
    <div>
      <div className="mx-auto max-w-[1080px] px-4 py-8">
        <div className="rounded-lg">
          <YearSelector
            initialYear={selectedYear}
            onYearChange={setSelectedYear}
          />
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 ${
                activeTab === "team"
                  ? "border-b-2 border-black font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("team")}
            >
              팀 순위
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "player"
                  ? "border-b-2 border-black font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("player")}
            >
              개인 순위
            </button>
          </div>
          {activeTab === "team" ? <TeamRankingTable /> : <PlayerRankingTable />}
        </div>
      </div>
    </div>
  );
}
