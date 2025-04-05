import { useState } from "react";
import KoreaMap from "../../../components/common/KoreaMap";

interface StadiumWeather {
  name: string;
  temp: number;
  rainProbability: number;
  color: string;
  hasGame: boolean;
  homeTeam?: string;
  awayTeam?: string;
  gameTime?: string;
  humidity?: number;
  windSpeed?: number;
  precipitation?: string;
  coordinates: {
    x: number;
    y: number;
  };
}

const STADIUM_LIST: StadiumWeather[] = [
  {
    name: "잠실야구장",
    temp: 19,
    rainProbability: 0,
    color: "#8B1E3F",
    hasGame: true,
    homeTeam: "LG",
    awayTeam: "LOTTE",
    gameTime: "2025.03.22 (토) 14:00",
    humidity: 34,
    windSpeed: 4.6,
    precipitation: "-mm",
    coordinates: { x: 450, y: 350 },
  },
  {
    name: "인천SSG랜더스필드",
    temp: 16,
    rainProbability: 0,
    color: "#D2001C",
    hasGame: false,
    coordinates: { x: 350, y: 300 },
  },
  {
    name: "대구삼성라이온즈파크",
    temp: 25,
    rainProbability: 0,
    color: "#074CA1",
    hasGame: false,
    coordinates: { x: 550, y: 600 },
  },
  {
    name: "수원KT위즈파크",
    temp: 21,
    rainProbability: 0,
    color: "#000000",
    hasGame: false,
    coordinates: { x: 400, y: 400 },
  },
  {
    name: "광주기아챔피언스필드",
    temp: 23,
    rainProbability: 0,
    color: "#C70125",
    hasGame: false,
    coordinates: { x: 300, y: 800 },
  },
];

export default function Weather() {
  const [selectedStadium, setSelectedStadium] = useState<StadiumWeather>(
    STADIUM_LIST[0],
  );

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-[1080px] px-4">
        <h2 className="mb-2 text-2xl font-bold">구장별 날씨 정보</h2>
        <p className="mb-8 text-gray-600">구장별 날씨 정보를 확인해 보세요</p>
        <div className="grid grid-cols-5 gap-6">
          {/* 왼쪽: 현재 선택된 구장의 상세 날씨 정보 */}
          <div className="col-span-2 flex flex-col rounded-[32px] bg-[#14183E] p-8 text-white">
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
                    src={`/images/${selectedStadium.homeTeam?.toLowerCase()}_emb.png`}
                    alt={selectedStadium.homeTeam}
                    className="h-16 w-16"
                  />
                  <span className="text-4xl font-bold">VS</span>
                  <img
                    src={`/images/${selectedStadium.awayTeam?.toLowerCase()}_emb.png`}
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

          {/* 오른쪽: 대한민국 지도와 구장 위치 */}
          <div className="relative col-span-3 rounded-[32px] bg-white p-8">
            <div className="absolute top-8 right-8 space-y-4">
              {STADIUM_LIST.map(stadium => (
                <div
                  key={stadium.name}
                  className="rounded-lg bg-white p-3 shadow-sm"
                >
                  <div
                    className="mb-1 font-medium"
                    style={{ color: stadium.color }}
                  >
                    {stadium.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                    <span>{stadium.temp}°C</span>
                    <span className="text-sm text-gray-500">
                      강수확률 {stadium.rainProbability}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-full w-[75%]">
              <KoreaMap
                stadiums={STADIUM_LIST}
                onStadiumClick={setSelectedStadium}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
