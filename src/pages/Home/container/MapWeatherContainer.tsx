import KoreaMap from "../components/KoreaMap";
import Weather from "../components/Weather";
import { Stadium } from "../../../types/Stadium";
import { SunMedium } from "lucide-react";

export default function MapWeatherContainer() {
  const handleStadiumClick = (stadium: Stadium) => {
    console.log("Selected stadium:", stadium);
  };

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
      <div className="xs:flex-col flex gap-4">
        <Weather />
        <KoreaMap onStadiumClick={handleStadiumClick} />
      </div>
    </div>
  );
}
