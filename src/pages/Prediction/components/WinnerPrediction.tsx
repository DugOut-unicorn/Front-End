import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { aiApi } from "../../../api/ai/apis";
import { TeamRankDTO } from "../../../types/ai";
import { getEnglishTeamName } from "../../../hooks/TeamNameChanger";

export default function WinnerPrediction() {
  const [teams, setTeams] = useState<TeamRankDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await aiApi.getFinalRank();
        setTeams(data);
      } catch (error) {
        console.error("팀 순위 데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[730px] w-[497px] flex-1 rounded-lg border border-[#E5EAF2] bg-white p-6 pb-10">
        <div className="flex h-full items-center justify-center">
          <p className="t-body1 text-[var(--on-surface-grey2)]">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[730px] w-[497px] flex-1 rounded-lg border border-[#E5EAF2] bg-white p-6 pb-10">
      <div className="mb-2 flex items-center gap-2">
        <Trophy size={24} className="text-[var(--on-surface-grey1)]" />
        <h3 className="t-h3 text-[var(--on-surface-grey1)]">최종 순위 예측</h3>
      </div>
      <p className="t-body1 mb-3 text-[var(--on-surface-grey1)]">
        AI 기반 최종 순위 예측 결과입니다.
      </p>
      <table className="min-w-full table-fixed border-collapse text-[var(--on-surface-default)]">
        <thead className="h-[48px] border-b border-[#E5EAF2]">
          <tr className="t-body1 h-[48px] text-[var(--on-surface-grey2)]">
            <th className="h-[48px] w-13 px-4 text-center">예상</th>
            <th className="h-[48px] w-9"></th>
            <th className="t-caption h-[48px] w-32 pl-4 text-left">팀명</th>
            <th className="t-caption h-[48px] w-24 px-4 text-center">
              현재 순위
            </th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team.id} className="h-[56px]">
              <td className="t-h3 h-[56px] w-13 px-4 text-center align-middle text-[var(--on-surface-grey2)]">
                {team.rank}
              </td>
              <td className="t-body1 h-[56px] w-9 text-left align-middle">
                <img
                  src={`/images/${getEnglishTeamName(team.teamName)}_big_emb.png`}
                  alt={team.teamName}
                  className="h-10 w-10 object-contain"
                />
              </td>
              <td className="t-body1 h-[56px] w-32 pl-4 text-left align-middle">
                {team.teamName}
              </td>
              <td className="t-body1 h-[56px] w-24 px-4 text-center align-middle">
                {team.currentRank}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
