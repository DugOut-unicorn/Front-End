import GameRow from "./GameRow";

export default function PlayingGame() {
  return (
    <div className="flex h-[526px] w-[395px] flex-col rounded-2xl bg-white p-4 shadow">
      {/* 진행 중인 경기 */}
      <div className="border-b border-[var(--divider-dv2)] px-4 pt-4 pb-0">
        <div className="t-caption-sb mb-2 text-[var(--on-surface-grey2)]">
          진행 중인 경기
        </div>
        <GameRow
          homeTeamLogo="/images/lg_emb.png"
          homeTeamName="LG"
          homeScore={4}
          awayTeamLogo="/images/ssg_emb.png"
          awayTeamName="SSG"
          awayScore={3}
          inning="6회 말"
          isLive
        />
        {/* ...다른 경기들도 GameRow로 반복 */}
      </div>
      {/* 최근 경기 결과 */}
      <div className="px-4 pt-0 pb-4">
        <div className="t-caption-sb mb-2 text-[var(--on-surface-grey2)]">
          최근 경기 결과
        </div>
        <GameRow
          homeTeamLogo="/images/lg_emb.png"
          homeTeamName="LG"
          homeScore={4}
          awayTeamLogo="/images/ssg_emb.png"
          awayTeamName="SSG"
          awayScore={3}
          inning="종료"
        />
        {/* ...다른 경기들도 GameRow로 반복 */}
      </div>
    </div>
  );
}
