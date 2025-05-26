import KoreaMap from "../components/KoreaMap";
import Weather from "../components/Weather";
import { Stadium, Stadiums } from "../../../types/Stadium";
import { SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { homeApi } from "../../../api/home/apis";
import { calendarGameDto, StadiumWeatherDto } from "../../../types/home";

// stadiumName 매핑 테이블 (KoreaMap, Weather와 동일하게 유지)
const STADIUM_NAME_MAP: Record<string, string> = {
  "서울종합운동장 야구장": "잠실야구장",
  "서울종합운동장 야구장 (두산)": "잠실야구장",
  "서울종합운동장 야구장 (LG)": "잠실야구장",
  인천SSG랜더스필드: "인천SSG랜더스필드",
  대구삼성라이온즈파크: "대구삼성라이온즈파크",
  수원KT위즈파크: "수원KT위즈파크",
  광주기아챔피언스필드: "광주기아챔피언스필드",
  // 필요시 추가
};

export default function MapWeatherContainer() {
  const [todayGames, setTodayGames] = useState<calendarGameDto[]>([]);
  const [stadiumWeathers, setStadiumWeathers] = useState<StadiumWeatherDto[]>(
    [],
  );
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);

  useEffect(() => {
    const fetchTodayGames = async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const data = await homeApi.getCalendarGames(year, month, day);
      setTodayGames(data.days[0]?.games || []);
    };
    fetchTodayGames();

    const fetchStadiumWeathers = async () => {
      const data = await homeApi.getStadiumWeathers();
      setStadiumWeathers(data);
    };
    fetchStadiumWeathers();
  }, []);

  // 선택된 구장의 날씨 정보
  const selectedStadiumWeather = stadiumWeathers.find(
    w =>
      (STADIUM_NAME_MAP[w.stadiumName] || w.stadiumName) ===
        selectedStadium?.name ||
      w.stadiumName ===
        (STADIUM_NAME_MAP[selectedStadium?.name ?? ""] ||
          selectedStadium?.name),
  );
  // 선택된 구장의 오늘 경기 정보
  const selectedStadiumGame = todayGames.find(
    g =>
      (STADIUM_NAME_MAP[g.stadiumName] || g.stadiumName) ===
        selectedStadium?.name ||
      g.stadiumName ===
        (STADIUM_NAME_MAP[selectedStadium?.name ?? ""] ||
          selectedStadium?.name),
  );

  return (
    <div className="flex w-252.5 flex-col">
      <div className="mb-2 flex items-center gap-2">
        <SunMedium size={24} className="text-[var(--on-surface-grey1)]" />
        <h3 className="t-h3 text-[var(--on-surface-grey1)]">
          구장별 날씨 정보
        </h3>
      </div>
      <p className="t-body1 mb-4 text-[var(--on-surface-grey1)]">
        구장별 날씨 정보를 확인해 보세요
      </p>
      <div className="xs:flex-col flex items-center gap-4 md:flex-col xl:flex-row">
        <Weather
          selectedStadium={selectedStadium}
          stadiumWeather={selectedStadiumWeather}
          game={selectedStadiumGame}
        />
        <KoreaMap
          onStadiumClick={setSelectedStadium}
          stadiums={Stadiums}
          todayGames={todayGames}
          stadiumWeathers={stadiumWeathers}
          selectedStadium={selectedStadium}
          stadiumNameMap={STADIUM_NAME_MAP}
        />
      </div>
    </div>
  );
}
