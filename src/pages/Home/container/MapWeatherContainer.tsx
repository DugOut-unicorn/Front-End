import KoreaMap from "../components/KoreaMap";
import Weather from "../components/Weather";
import { Stadium } from "../../../types/Stadium";

export default function MapWeatherContainer() {
  const handleStadiumClick = (stadium: Stadium) => {
    console.log("Selected stadium:", stadium);
  };

  return (
    <div className="mx-auto max-w-[1080px] px-4">
      <h2 className="mb-2 text-2xl font-bold">구장별 날씨 정보</h2>
      <p className="mb-8 text-gray-600">구장별 날씨 정보를 확인해 보세요</p>
      <div className="flex gap-4">
        <KoreaMap onStadiumClick={handleStadiumClick} />
        <Weather />
      </div>
    </div>
  );
}
