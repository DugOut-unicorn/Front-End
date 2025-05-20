import { useNavigate } from "react-router-dom";

interface TeamRankingData {
  rank: number;
  teamName: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  winningPercentage: number;
  gamesBehind: number;
  streak: string;
  last10: string;
  runsScored: number;
  runsAllowed: number;
}

interface TeamRankingTableProps {
  rankings: TeamRankingData[];
}

export default function TeamRankingTable({ rankings }: TeamRankingTableProps) {
  const navigate = useNavigate();

  const handleTeamClick = (teamName: string) => {
    navigate(`/team/${teamName.toLowerCase()}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 text-sm">
            <th className="p-3 text-left">순위</th>
            <th className="p-3 text-left">구단</th>
            <th className="p-3 text-center">경기</th>
            <th className="p-3 text-center">승</th>
            <th className="p-3 text-center">무</th>
            <th className="p-3 text-center">패</th>
            <th className="p-3 text-center">승률</th>
            <th className="p-3 text-center">게임차</th>
            <th className="p-3 text-center">연속</th>
            <th className="p-3 text-center">타율</th>
            <th className="p-3 text-center">평균자책</th>
            <th className="p-3 text-center">최근 10경기</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map(team => (
            <tr
              key={team.rank}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="p-3">{team.rank}</td>
              <td
                className="flex cursor-pointer items-center gap-2 p-3"
                onClick={() => handleTeamClick(team.teamName)}
              >
                <img
                  src={`/images/${team.teamName.toLowerCase()}_emb.png`}
                  alt={team.teamName}
                  className="h-6 w-6"
                />
                {team.teamName}
              </td>
              <td className="p-3 text-center">{team.games}</td>
              <td className="p-3 text-center">{team.wins}</td>
              <td className="p-3 text-center">{team.draws}</td>
              <td className="p-3 text-center">{team.losses}</td>
              <td className="p-3 text-center">
                {team.winningPercentage.toFixed(3)}
              </td>
              <td className="p-3 text-center">{team.gamesBehind.toFixed(1)}</td>
              <td className="p-3 text-center">{team.streak}</td>
              <td className="p-3 text-center">{team.runsScored.toFixed(3)}</td>
              <td className="p-3 text-center">{team.runsAllowed.toFixed(2)}</td>
              <td className="p-3 text-center">{team.last10}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
