export default function EntryBanner() {
  return (
    <div className="flex h-39 w-full flex-row items-center justify-between overflow-hidden bg-gradient-to-b from-[rgba(var(--team-lotte-rgb),0.3)] to-[rgba(var(--team-lotte-rgb),0)] px-8 py-9">
      <div className="t-h2 text-[var(--on-surface-grey1)]">
        반가워요 **님!
        <br />
        직관의 설렘, 오늘도 시작해볼까요?
      </div>
      <img
        src="/images/lotte_emb.png"
        alt="lotte_emb"
        className="h-98 w-98 opacity-60"
      />
    </div>
  );
}
