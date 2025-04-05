export default function PlayingGame() {
  return (
    <>
      <section className="py-8">
        <div className="mx-auto max-w-[1080px] px-4">
          <h2 className="mb-4 text-xl font-semibold">진행 중인 경기</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow">
              <p>두산 vs LG</p>
              <p>3:2 (5회)</p>
            </div>
            <div className="bg-white p-4 shadow">
              <p>NC vs KIA</p>
              <p>1:0 (3회)</p>
            </div>
            <div className="bg-white p-4 shadow">
              <p>SSG vs 롯데</p>
              <p>4:4 (7회)</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
