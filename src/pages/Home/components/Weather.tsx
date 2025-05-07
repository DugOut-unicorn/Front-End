import { useState } from "react";
import { Stadium } from "../../../types/Stadium";
import {
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRainWind,
  CloudSnow,
} from "lucide-react";

export default function Weather() {
  // 예시용 기본 데이터. 실제 상황에서는 props나 API 호출로 받은 데이터를 사용할 수 있습니다.
  const [selectedStadium, setSelectedStadium] = useState<Stadium>({
    name: "사직야구장",
    color: "#002856",
    flagCode: "SJ",
    gameTime: "2025.04.10 (목) 18:30",
    hasGame: true,
    homeTeam: "kia",
    awayTeam: "lotte",
    temp: 14,
    precipitation: "0mm",
    humidity: 69,
    windSpeed: 4,
  });

  return (
    <div className="flex h-148 w-96 flex-col items-center rounded-2xl bg-gradient-to-b from-blue-500 to-blue-300 px-4 pt-10 pb-4">
      <h3 className="t-h3 mb-2 text-[var(--on-fill-default)]">
        {selectedStadium.name} 현재 날씨
      </h3>
      {selectedStadium.gameTime && (
        <p className="t-body-1 mb-8 text-[var(--on-fill-blue)]">
          경기 시간: {selectedStadium.gameTime}
        </p>
      )}

      {selectedStadium.hasGame && (
        <div className="mb-6 flex w-full items-center justify-center gap-8">
          <img
            src={`/images/${selectedStadium.homeTeam
              ?.toLowerCase()
              .replace(" ", "")}_emb.png`}
            alt={selectedStadium.homeTeam}
            className="h-18 w-18 rounded-full bg-white object-contain object-center"
          />
          <span className="t-h1 text-[var(--on-fill-blue)] opacity-50">VS</span>
          <img
            src={`/images/${selectedStadium.awayTeam
              ?.toLowerCase()
              .replace(" ", "")}_emb.png`}
            alt={selectedStadium.awayTeam}
            className="h-18 w-18 rounded-full bg-white object-contain object-center"
          />
        </div>
      )}

      <SunMedium className="mb-5 h-25 w-25 text-yellow-200" />
      <p className="t-caption-sb mb-3 text-[var(--on-fill-default)]">맑음</p>
      <p className="t-h2 text-[var(--surface-1)]">{selectedStadium.temp}°C</p>

      <div className="mt-auto grid grid-cols-3 gap-2">
        <div className="h-24 w-28 rounded-xl bg-white/20 p-4 text-center backdrop-blur-sm">
          <div className="t-caption-sb mb-4.5 text-[var(--on-fill-default)]">
            강수량
          </div>
          <div className="t-h3 text-[var(--on-fill-default)]">
            {selectedStadium.precipitation ?? "-mm"}
          </div>
        </div>
        <div className="h-24 w-28 rounded-xl bg-white/20 p-4 text-center backdrop-blur-sm">
          <div className="t-caption-sb mb-4.5 text-[var(--on-fill-default)]">
            습도
          </div>
          <div className="t-h3 text-[var(--on-fill-default)]">
            {selectedStadium.humidity ?? "-"}%
          </div>
        </div>
        <div className="h-24 w-28 rounded-xl bg-white/20 p-4 text-center backdrop-blur-sm">
          <div className="t-caption-sb mb-4.5 text-[var(--on-fill-default)]">
            풍향,풍속
          </div>
          <div className="t-h3 text-[var(--on-fill-default)]">
            {selectedStadium.windSpeed ?? "-"}m/s
          </div>
        </div>
      </div>
    </div>
  );
}
