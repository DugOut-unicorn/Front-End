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

  // const handleTeamClick = (teamIdx: number) => {
  //   const englishName = getEnglishTeamName(getTeamNameByIdx(teamIdx));
  //   navigate(`/team/${englishName.toLowerCase()}`);
  // };

  if (isLoading) {
    return <div className="flex justify-center p-4">로딩 중...</div>;
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <div className="rounded-2xl bg-white p-4">
        <table className="w-full text-center">
          <thead>
            <tr className="text-base font-semibold text-gray-700">
              <th className="px-1 py-2"></th>
              <th className="t-caption py-2 pr-1 pl-12 text-left text-[var(--on-surface-grey2)]">
                팀명
              </th>
              <th className="t-caption px-1 py-2 text-[var(--on-surface-grey2)]">
                경기
              </th>
              <th className="t-caption px-1 py-2 text-[var(--on-surface-grey2)]">
                승
              </th>
              <th className="t-caption px-1 py-2 text-[var(--on-surface-grey2)]">
                무
              </th>
              <th className="t-caption px-1 py-2 text-[var(--on-surface-grey2)]">
                패
              </th>
              <th className="t-caption px-1 py-2 text-[var(--on-surface-grey2)]">
                승률
              </th>
              <th className="t-caption px-1 py-2 text-[var(--on-surface-grey2)]">
                게임차
              </th>
              <th className="t-caption px-1 py-2 text-[var(--on-surface-grey2)]">
                연속
              </th>
              <th className="t-caption px-1 py-2 text-[var(--on-surface-grey2)]">
                최근10경기
              </th>
            </tr>
          </thead>
          <tbody>
            {rankings.map(team => (
              <tr key={team.rank} className="text-base">
                <td className="t-h3 px-1 py-2 text-center text-[var(--on-surface-grey2)]">
                  {team.rank}
                </td>
                <td className="px-1 py-2 text-left">
                  <div className="flex items-center gap-2">
                    <img
                      src={team.teamLogo}
                      alt={team.teamName}
                      className="h-9 w-9"
                    />
                    <span className="t-body1">{team.teamName}</span>
                  </div>
                </td>
                <td className="t-body1 px-1 py-2">{team.games}</td>
                <td className="t-body1 px-1 py-2">{team.wins}</td>
                <td className="t-body1 px-1 py-2">{team.draws}</td>
                <td className="t-body1 px-1 py-2">{team.losses}</td>
                <td className="t-body1 px-1 py-2">{team.winRate.toFixed(3)}</td>
                <td className="t-body1 px-1 py-2">{team.gameGap}</td>
                <td className="t-body1 px-1 py-2">{team.streak}</td>
                <td className="t-body1 px-1 py-2">{team.recentTen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
