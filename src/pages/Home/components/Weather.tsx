import { useState } from "react";
import { Stadium } from "../../../types/Stadium";

export default function Weather() {
  // 예시용 기본 데이터. 실제 상황에서는 props나 API 호출로 받은 데이터를 사용할 수 있습니다.
  const [selectedStadium, setSelectedStadium] = useState<Stadium>({
    name: "사직야구장",
    color: "#002856",
    flagCode: "SJ",
    gameTime: "2025.04.10 (목) 18:30",
    hasGame: true,
    homeTeam: "KIA 타이거즈",
    awayTeam: "롯데 자이언츠",
    temp: 14,
    precipitation: "0mm",
    humidity: 69,
    windSpeed: 4,
  });

  return (
    <div className="flex h-[584px] flex-col gap-4 md:flex-row">
      {/* 우측: 상세 정보 영역 - 두번째 코드 블록의 내용 */}
      <div className="flex flex-col rounded-[13px] bg-[#14183E] p-8 text-white">
        <h3 className="mb-2 text-2xl font-bold">
          {selectedStadium.name} 현재 날씨
        </h3>
        {selectedStadium.gameTime && (
          <p className="mb-8 text-gray-300">
            경기 시간: {selectedStadium.gameTime}
          </p>
        )}

        {selectedStadium.hasGame && (
          <div className="mb-12 flex flex-col items-center">
            <div className="mb-8 flex w-full items-center justify-center gap-8">
              <img
                src={`/images/${selectedStadium.homeTeam
                  ?.toLowerCase()
                  .replace(" ", "")}_emb.png`}
                alt={selectedStadium.homeTeam}
                className="h-16 w-16"
              />
              <span className="text-4xl font-bold">VS</span>
              <img
                src={`/images/${selectedStadium.awayTeam
                  ?.toLowerCase()
                  .replace(" ", "")}_emb.png`}
                alt={selectedStadium.awayTeam}
                className="h-16 w-16"
              />
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mb-4 h-16 w-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
              <span className="text-5xl font-bold">
                {selectedStadium.temp}°C
              </span>
            </div>
          </div>
        )}

        <div className="mt-auto grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-[#1C2149] p-4 text-center">
            <div className="mb-2 text-sm text-gray-400">강수량</div>
            <div className="text-lg font-medium">
              {selectedStadium.precipitation ?? "-mm"}
            </div>
          </div>
          <div className="rounded-2xl bg-[#1C2149] p-4 text-center">
            <div className="mb-2 text-sm text-gray-400">습도</div>
            <div className="text-lg font-medium">
              {selectedStadium.humidity ?? "-"}%
            </div>
          </div>
          <div className="rounded-2xl bg-[#1C2149] p-4 text-center">
            <div className="mb-2 text-sm text-gray-400">풍향,풍속</div>
            <div className="text-lg font-medium">
              {selectedStadium.windSpeed ?? "-"}m/s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
