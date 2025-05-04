export default function GameRow({
  homeTeamLogo,
  homeTeamName,
  homeScore,
  awayTeamLogo,
  awayTeamName,
  awayScore,
  inning,
  isLive,
}: {
  homeTeamLogo: string;
  homeTeamName: string;
  homeScore: number;
  awayTeamLogo: string;
  awayTeamName: string;
  awayScore: number;
  inning: string; // 예: "6회 말", "종료"
  isLive?: boolean;
}) {
  return (
    <div className="flex h-[48px] w-[363px] items-center justify-between">
      {/* 홈팀 */}
      <div className="flex min-w-[80px] items-center gap-2">
        <span className="t-footnote text-[var(--on-surface-grey1)]">
          {homeTeamName}
        </span>
        <img
          src={homeTeamLogo}
          alt={homeTeamName}
          className="h-10 w-10 rounded-full border border-zinc-200 bg-white object-contain"
        />
      </div>
      {/* 점수 및 이닝 */}
      <div className="flex min-w-[120px] items-center justify-center gap-2 rounded-full bg-[var(--surface-3)] px-4 py-1">
        <span className="t-h3 text-[var(--on-surface-grey1)]">{homeScore}</span>
        <span className="t-footnote text-[var(--on-surface-grey2)]">
          {inning}
        </span>
        <span className="t-h3 text-[var(--on-surface-grey1)]">{awayScore}</span>
      </div>
      {/* 원정팀 */}
      <div className="flex min-w-[80px] items-center justify-end gap-2">
        <img
          src={awayTeamLogo}
          alt={awayTeamName}
          className="h-10 w-10 rounded-full border border-zinc-200 bg-white object-contain"
        />
        <span className="t-footnote text-[var(--on-surface-grey1)]">
          {awayTeamName}
        </span>
      </div>
    </div>
  );
}
