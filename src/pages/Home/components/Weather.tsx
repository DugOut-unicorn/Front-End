import { getEnglishTeamName } from "../../../api/home/apis";
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
import { calendarGameDto, StadiumWeatherDto } from "../../../types/home";

type WeatherProps = {
  selectedStadium: Stadium | null;
  stadiumWeather?: StadiumWeatherDto;
  game?: calendarGameDto;
};

// getWeatherIcon 함수 재사용 (KoreaMap.tsx와 동일하게 복사)
function getWeatherIcon(condition: string) {
  switch (condition) {
    case "맑음":
      return <SunMedium size={32} className="mb-5 h-25 w-25 text-yellow-200" />;
    case "구름많음":
      return <CloudSun size={32} className="mb-5 h-25 w-25 text-yellow-200" />;
    case "흐림":
      return <Cloud size={32} className="mb-5 h-25 w-25 text-yellow-200" />;
    case "비":
      return (
        <CloudRainWind size={32} className="mb-5 h-25 w-25 text-yellow-200" />
      );
    case "천둥번개":
      return (
        <CloudLightning size={32} className="mb-5 h-25 w-25 text-yellow-200" />
      );
    case "눈":
      return <CloudSnow size={32} className="mb-5 h-25 w-25 text-yellow-200" />;
    case "안개":
      return <CloudFog size={32} className="mb-5 h-25 w-25 text-yellow-200" />;
    default:
      return <SunMedium size={32} className="mb-5 h-25 w-25 text-yellow-200" />;
  }
}

function formatGameDate(time: string) {
  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[today.getDay()];
  return `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")} (${dayOfWeek}) ${time}`;
}

export default function Weather({
  selectedStadium,
  stadiumWeather,
  game,
}: WeatherProps) {
  const weather = stadiumWeather;

  return (
    <div className="flex h-148 w-96 flex-col items-center rounded-2xl bg-gradient-to-b from-blue-500 to-blue-300 px-4 pt-10 pb-4">
      <h3 className="t-h3 mb-2 text-[var(--on-fill-default)]">
        {selectedStadium?.name || "구장 선택"} 현재 날씨
      </h3>
      {game && (
        <p className="t-body-1 mb-8 text-[var(--on-fill-blue)]">
          경기 시간: {formatGameDate(game.startTime)}
        </p>
      )}
      {game ? (
        <div className="mb-6 flex w-full items-center justify-center gap-8">
          <img
            src={`/images/${getEnglishTeamName(game.homeTeamName)}_big_emb.png`}
            alt={game.homeTeamName}
            className="h-18 w-18 rounded-full bg-white object-contain object-center"
          />
          <span className="t-h1 text-[var(--on-fill-blue)] opacity-50">VS</span>
          <img
            src={`/images/${getEnglishTeamName(game.awayTeamName)}_big_emb.png`}
            alt={game.awayTeamName}
            className="h-18 w-18 rounded-full bg-white object-contain object-center"
          />
        </div>
      ) : (
        <div className="mb-6 flex w-full items-center justify-center gap-8">
          <span className="t-body-1 text-[var(--on-fill-blue)]">
            오늘은 경기가 없습니다.
          </span>
        </div>
      )}
      {getWeatherIcon(weather?.condition ?? "")}
      <p className="t-caption-sb mb-3 text-[var(--on-fill-default)]">
        {weather?.condition ?? "-"}
      </p>
      <p className="t-h2 text-[var(--surface-1)]">
        {weather?.temperature ?? "-"}°C
      </p>
      <div className="mt-auto grid grid-cols-3 gap-2">
        <div className="h-24 w-28 rounded-xl bg-white/20 p-4 text-center backdrop-blur-sm">
          <div className="t-caption-sb mb-4.5 text-[var(--on-fill-default)]">
            강수량
          </div>
          <div className="t-h3 text-[var(--on-fill-default)]">
            {weather?.precipitation ?? "-"}mm
          </div>
        </div>
        <div className="h-24 w-28 rounded-xl bg-white/20 p-4 text-center backdrop-blur-sm">
          <div className="t-caption-sb mb-4.5 text-[var(--on-fill-default)]">
            습도
          </div>
          <div className="t-h3 text-[var(--on-fill-default)]">
            {weather?.humidity ?? "-"}%
          </div>
        </div>
        <div className="h-24 w-28 rounded-xl bg-white/20 p-4 text-center backdrop-blur-sm">
          <div className="t-caption-sb mb-4.5 text-[var(--on-fill-default)]">
            풍향,풍속
          </div>
          <div className="t-h3 text-[var(--on-fill-default)]">
            {weather?.windSpeed ?? "-"}m/s
          </div>
        </div>
      </div>
    </div>
  );
}
