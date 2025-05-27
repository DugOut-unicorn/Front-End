import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rankingApi } from "../../../api/ranking/apis";
import {
  getEnglishTeamName,
  getTeamNameByIdx,
} from "../../../hooks/TeamNameChanger";

interface RankingResponse {
  rank: number;
  teamIdx: number;
  teamName: string;
  teamLogo: string;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  winRate: number;
  gameGap: number;
  streak: string;
  recentTen: string;
}

export default function TeamRankingTable() {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState<RankingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await rankingApi.getTeamRanking();
        setRankings(data);
      } catch (error) {
        console.error("순위 데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const handleTeamClick = (teamIdx: number) => {
    const englishName = getEnglishTeamName(getTeamNameByIdx(teamIdx));
    navigate(`/team/${englishName.toLowerCase()}`);
  };

  if (isLoading) {
    return <div className="flex justify-center p-4">로딩 중...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 text-sm">
            <th className="t-caption text-left text-[var(--on-surface-grey1)]"></th>
            <th className="t-caption pl-14 text-left text-[var(--on-surface-grey1)]">
              팀명
            </th>
            <th className="t-caption text-center text-[var(--on-surface-grey1)]">
              경기
            </th>
            <th className="t-caption text-center text-[var(--on-surface-grey1)]">
              승
            </th>
            <th className="t-caption text-center text-[var(--on-surface-grey1)]">
              무
            </th>
            <th className="t-caption text-center text-[var(--on-surface-grey1)]">
              패
            </th>
            <th className="t-caption text-center text-[var(--on-surface-grey1)]">
              승률
            </th>
            <th className="t-caption text-center text-[var(--on-surface-grey1)]">
              게임차
            </th>
            <th className="t-caption text-center text-[var(--on-surface-grey1)]">
              연속
            </th>
            <th className="t-caption text-center text-[var(--on-surface-grey1)]">
              최근 10경기
            </th>
          </tr>
        </thead>
        <tbody>
          {rankings.map(team => (
            <tr
              key={team.rank}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="t-h3 text-[var(--on-surface-grey2 )] text-center">
                {team.rank}
              </td>
              <td
                className="flex cursor-pointer items-center gap-2 p-3"
                onClick={() => handleTeamClick(team.teamIdx)}
              >
                <img
                  src={team.teamLogo}
                  alt={team.teamName}
                  className="h-9 w-9"
                />
                {team.teamName}
              </td>
              <td className="t-body1 text-center text-[var(--on-surface-default)]">
                {team.games}
              </td>
              <td className="t-body1 text-center text-[var(--on-surface-default)]">
                {team.wins}
              </td>
              <td className="t-body1 text-center text-[var(--on-surface-default)]">
                {team.draws}
              </td>
              <td className="t-body1 text-center text-[var(--on-surface-default)]">
                {team.losses}
              </td>
              <td className="t-body1 text-center text-[var(--on-surface-default)]">
                {team.winRate.toFixed(3)}
              </td>
              <td className="t-body1 text-center text-[var(--on-surface-default)]">
                {team.gameGap}
              </td>
              <td className="t-body1 text-center text-[var(--on-surface-default)]">
                {team.streak}
              </td>
              <td className="t-body1 text-center text-[var(--on-surface-default)]">
                {team.recentTen}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
