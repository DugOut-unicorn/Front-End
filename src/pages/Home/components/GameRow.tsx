export default function GameRow({
  homeTeamLogo,
  homeTeamName,
  homeScore,
  awayTeamLogo,
  awayTeamName,
  awayScore,
  inning,
}: {
  homeTeamLogo: string;
  homeTeamName: string;
  homeScore: number;
  awayTeamLogo: string;
  awayTeamName: string;
  awayScore: number;
  inning: string; // 예: "6회 말", "종료"
}) {
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
      {/* 점수 및 이닝 */}
      <div className="flex min-w-[120px] items-center justify-center rounded-full bg-[var(--surface-3)] px-4 py-1">
        <span className="t-h3 mr-4 text-[var(--on-surface-grey1)]">
          {homeScore}
        </span>
        <span className="t-footnote mr-2 text-[var(--on-surface-grey2)]">
          {inning}
        </span>
        <span className="t-h3 text-[var(--on-surface-grey1)]">{awayScore}</span>
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
}
