export default function PlayingGame() {
  return (
    <div className="relative z-20 -mt-6 px-4">
      <div className="mx-auto flex max-w-[1080px] flex-row items-center justify-between rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">진행 중인 경기</h2>
        <div className="mx-4 h-12 w-px bg-gray-200"></div>
        <div className="flex items-center">
          {/* 첫 번째 경기 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/lg_emb.png" alt="LG" className="h-12 w-12" />
              <span className="text-lg font-semibold">LG</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">3</span>
              <span className="font-medium text-gray-500">VS</span>
              <span className="text-2xl font-bold">4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">두산</span>
              <img
                src="/images/doosan_emb.png"
                alt="두산"
                className="h-12 w-12"
              />
            </div>
          </div>

          {/* 구분선 */}
          <div className="mx-4 h-12 w-px bg-gray-200"></div>

          {/* 두 번째 경기 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/lg_emb.png" alt="LG" className="h-12 w-12" />
              <span className="text-lg font-semibold">LG</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">3</span>
              <span className="font-medium text-gray-500">VS</span>
              <span className="text-2xl font-bold">4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">두산</span>
              <img
                src="/images/doosan_emb.png"
                alt="두산"
                className="h-12 w-12"
              />
            </div>
          </div>

          {/* 구분선 */}
          <div className="mx-4 h-12 w-px bg-gray-200"></div>

          {/* 세 번째 경기 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/lg_emb.png" alt="LG" className="h-12 w-12" />
              <span className="text-lg font-semibold">LG</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">3</span>
              <span className="font-medium text-gray-500">VS</span>
              <span className="text-2xl font-bold">4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">두산</span>
              <img
                src="/images/doosan_emb.png"
                alt="두산"
                className="h-12 w-12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
