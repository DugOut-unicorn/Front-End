import React from "react";

interface PredictionRowProps {
  homeTeamName: string;
  homeTeamLogo: string;
  homeWinPercent: number;
  awayTeamName: string;
  awayTeamLogo: string;
  awayWinPercent: number;
}

const PredictionRow: React.FC<PredictionRowProps> = ({
  homeTeamName,
  homeTeamLogo,
  homeWinPercent,
  awayTeamName,
  awayTeamLogo,
  awayWinPercent,
}) => {
  const homeIsHigher = homeWinPercent >= awayWinPercent;
  return (
    <li className="flex h-[40px] w-[363px] list-none items-center justify-between">
      {/* 홈팀 */}
      <div className="flex min-w-[80px] items-center gap-12">
        <span className="t-footnote flex h-[40px] w-[64px] items-center text-center text-[var(--on-surface-grey1)]">
          {homeTeamName}
        </span>
        <img
          src={homeTeamLogo}
          alt={homeTeamName}
          className="mr-2 h-8 w-8 gap-8 rounded-full border border-[var(--divider-dv2)] bg-white object-contain"
        />
      </div>
      {/* 승률 */}
      <div className="flex min-w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-[#e3d6e8] to-[#d6d8e8] px-4 py-1">
        <span
          className={`t-h3 mr-2 ${homeIsHigher ? "font-bold text-[#222]" : "font-normal text-[#bbb]"}`}
        >
          {homeWinPercent}%
        </span>
        <span
          className={`t-h3 ${!homeIsHigher ? "font-bold text-[#222]" : "font-normal text-[#bbb]"}`}
        >
          {awayWinPercent}%
        </span>
      </div>
      {/* 원정팀 */}
      <div className="flex min-w-[80px] items-center justify-end gap-12">
        <img
          src={awayTeamLogo}
          alt={awayTeamName}
          className="ml-2 h-8 w-8 gap-8 rounded-full border border-[var(--divider-dv2)] bg-white object-contain"
        />
        <span className="t-footnote flex h-[40px] w-[64px] items-center text-center text-[var(--on-surface-grey1)]">
          {awayTeamName}
        </span>
      </div>
    </li>
  );
};

export default PredictionRow;
