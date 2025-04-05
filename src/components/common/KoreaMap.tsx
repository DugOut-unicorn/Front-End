import koreaMap from "../../assets/korea_map.png";
interface Stadium {
  name: string;
  color: string;
  hasGame: boolean;
  temp: number;
  rainProbability: number;
  coordinates: {
    x: number;
    y: number;
  };
  homeTeam?: string;
  awayTeam?: string;
  gameTime?: string;
  humidity?: number;
  windSpeed?: number;
  precipitation?: string;
}

interface KoreaMapProps {
  stadiums: Stadium[];
  onStadiumClick?: (stadium: Stadium) => void;
}

export default function KoreaMap({ stadiums, onStadiumClick }: KoreaMapProps) {
  return (
    <div className="relative h-full w-full">
      {/* 한국 지도 이미지 */}
      <img src={koreaMap} alt="대한민국 지도" className="h-full w-full" />

      {/* 구장 마커 */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 800 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {stadiums.map(stadium => (
            <g
              key={stadium.name}
              transform={`translate(${stadium.coordinates.x}, ${stadium.coordinates.y})`}
              onClick={() => onStadiumClick?.(stadium)}
              className="cursor-pointer duration-200 hover:scale-105"
            >
              {/* 마커 배경 원 */}
              <circle
                r="18"
                fill={stadium.hasGame ? stadium.color : "white"}
                stroke={stadium.color}
                strokeWidth="3"
                className="drop-shadow-lg"
              />
              {/* 야구장 아이콘 */}
              <path
                d="M-8 0 A8 8 0 0 1 8 0 A8 8 0 0 1 -8 0"
                stroke={stadium.hasGame ? "white" : stadium.color}
                strokeWidth="2.5"
                fill="none"
              />
              <line
                x1="-8"
                y1="0"
                x2="8"
                y2="0"
                stroke={stadium.hasGame ? "white" : stadium.color}
                strokeWidth="2.5"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// 기본 구장 정보
export const DEFAULT_STADIUMS: Stadium[] = [
  {
    name: "잠실야구장",
    color: "#C70125",
    hasGame: false,
    temp: 0,
    rainProbability: 0,
    coordinates: { x: 400, y: 300 },
  },
  {
    name: "고척스카이돔",
    color: "#C70125",
    hasGame: false,
    temp: 0,
    rainProbability: 0,
    coordinates: { x: 380, y: 290 },
  },
  {
    name: "인천SSG랜더스필드",
    color: "#FF0000",
    hasGame: false,
    temp: 0,
    rainProbability: 0,
    coordinates: { x: 350, y: 280 },
  },
  {
    name: "수원KT위즈파크",
    color: "#000000",
    hasGame: false,
    temp: 0,
    rainProbability: 0,
    coordinates: { x: 385, y: 320 },
  },
  {
    name: "대구삼성라이온즈파크",
    color: "#0066B3",
    hasGame: false,
    temp: 0,
    rainProbability: 0,
    coordinates: { x: 500, y: 450 },
  },
  {
    name: "사직야구장",
    color: "#FF6600",
    hasGame: false,
    temp: 0,
    rainProbability: 0,
    coordinates: { x: 520, y: 600 },
  },
  {
    name: "창원NC파크",
    color: "#315288",
    hasGame: false,
    temp: 0,
    rainProbability: 0,
    coordinates: { x: 480, y: 580 },
  },
  {
    name: "광주기아챔피언스필드",
    color: "#EA0029",
    hasGame: false,
    temp: 0,
    rainProbability: 0,
    coordinates: { x: 280, y: 600 },
  },
  {
    name: "대전한화생명이글스파크",
    color: "#FF6600",
    hasGame: false,
    temp: 0,
    rainProbability: 0,
    coordinates: { x: 400, y: 400 },
  },
];
