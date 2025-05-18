import GameRow from "./GameRow";

export default function PlayingGame() {
  return (
    <div className="flex h-[526px] w-[395px] flex-col gap-5 rounded-[16px] bg-[var(--surface-1)] p-4">
      <div className="border-b border-[var(--divider-dv2)]">
        <div className="t-caption-sb mb-1 text-[var(--on-surface-grey2)]">
          진행 중인 경기
        </div>
        <div className="mb-1 flex flex-col gap-1">
          <GameRow
            homeTeamLogo="/images/lg_emb.png"
            homeTeamName="LG"
            homeScore={2}
            awayTeamLogo="/images/ssg_emb.png"
            awayTeamName="SSG"
            awayScore={3}
            inning="6회 말"
            isLive
          />
          <GameRow
            homeTeamLogo="/images/lg_emb.png"
            homeTeamName="LG"
            homeScore={2}
            awayTeamLogo="/images/ssg_emb.png"
            awayTeamName="SSG"
            awayScore={3}
            inning="6회 말"
            isLive
          />
          <GameRow
            homeTeamLogo="/images/lg_emb.png"
            homeTeamName="LG"
            homeScore={2}
            awayTeamLogo="/images/ssg_emb.png"
            awayTeamName="SSG"
            awayScore={3}
            inning="6회 말"
            isLive
          />
          <GameRow
            homeTeamLogo="/images/lg_emb.png"
            homeTeamName="LG"
            homeScore={2}
            awayTeamLogo="/images/ssg_emb.png"
            awayTeamName="SSG"
            awayScore={3}
            inning="6회 말"
            isLive
          />
          <GameRow
            homeTeamLogo="/images/lg_emb.png"
            homeTeamName="LG"
            homeScore={2}
            awayTeamLogo="/images/ssg_emb.png"
            awayTeamName="SSG"
            awayScore={3}
            inning="6회 말"
            isLive
          />
        </div>
      </div>

      <div>
        <div className="t-caption-sb mb-1 text-[var(--on-surface-grey2)]">
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
        <GameRow
          homeTeamLogo="/images/lg_emb.png"
          homeTeamName="LG"
          homeScore={4}
          awayTeamLogo="/images/ssg_emb.png"
          awayTeamName="SSG"
          awayScore={3}
          inning="종료"
        />
        <GameRow
          homeTeamLogo="/images/lg_emb.png"
          homeTeamName="LG"
          homeScore={4}
          awayTeamLogo="/images/ssg_emb.png"
          awayTeamName="SSG"
          awayScore={3}
          inning="종료"
        />
        <GameRow
          homeTeamLogo="/images/lg_emb.png"
          homeTeamName="LG"
          homeScore={4}
          awayTeamLogo="/images/ssg_emb.png"
          awayTeamName="SSG"
          awayScore={3}
          inning="종료"
        />
        <GameRow
          homeTeamLogo="/images/lg_emb.png"
          homeTeamName="LG"
          homeScore={4}
          awayTeamLogo="/images/ssg_emb.png"
          awayTeamName="SSG"
          awayScore={3}
          inning="종료"
        />
      </div>
    </div>
  );
}
