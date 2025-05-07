import React from "react";
import { Medal } from "lucide-react";
import { Team } from "../container/TeamOverviewContainer";

interface TeamRankingTableProps {
  teams: Team[];
}

export function TeamRankingTable({ teams }: TeamRankingTableProps) {
  return (
    <div className="h-[620px] w-[497px] flex-1 bg-[var(--surface-2)]">
      <div className="mb-2 flex items-center gap-2">
        <Medal size={24} className="text-[var(--on-surface-grey1)]" />
        <h3 className="t-h3 text-[var(--on-surface-grey1)]">팀 순위</h3>
      </div>
      <p className="t-body1 mb-3 text-[var(--on-surface-grey1)]">
        전체 팀 순위를 확인해보세요.
      </p>

      <div className="h-[552px] w-[497px] rounded-lg border border-[#E5EAF2] bg-white p-3">
        <table className="min-w-full table-fixed border-collapse text-[var(--on-surface-default)]">
          {/* 헤더 */}
          <thead className="h-[48px] border-b border-[#E5EAF2]">
            <tr className="t-body1 h-[48px] text-[var(--on-surface-grey2)]">
              <th className="h-[48px] w-13 px-4 text-center"></th>
              <th className="h-[48px] w-9"></th>
              <th className="t-caption h-[48px] w-32 pl-4 text-left">팀명</th>
              <th className="t-caption h-[48px] w-16 px-4 text-center">경기</th>
              <th className="t-caption h-[48px] w-16 px-4 text-center">승</th>
              <th className="t-caption h-[48px] w-16 px-4 text-center">무</th>
              <th className="t-caption h-[48px] w-16 px-4 text-center">패</th>
            </tr>
          </thead>

          {/* 바디: row 높이 48px, 세로 정렬 중간 */}
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id} className="h-[48px]">
                <td className="t-h3 h-[48px] w-13 px-4 text-center align-middle text-[var(--on-surface-grey2)]">
                  {idx + 1}
                </td>
                <td className="t-body1 h-[48px] w-9 text-left align-middle">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="h-6 w-9 object-contain"
                  />
                </td>
                <td className="t-body1 h-[48px] w-32 pl-4 text-left align-middle">
                  {team.name}
                </td>
                <td className="t-body1 h-[48px] w-16 px-4 text-center align-middle">
                  {team.games}
                </td>
                <td className="t-body1 h-[48px] w-16 px-4 text-center align-middle">
                  {team.wins}
                </td>
                <td className="t-body1 h-[48px] w-16 px-4 text-center align-middle">
                  {team.draws}
                </td>
                <td className="t-body1 h-[48px] w-16 px-4 text-center align-middle">
                  {team.losses}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
