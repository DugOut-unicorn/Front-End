export type Stadium = {
  name: string;
  color: string;
  flagCode: string;
  gameTime?: string;
  hasGame?: boolean;
  homeTeam?: string;
  awayTeam?: string;
  temp?: number;
  precipitation?: string;
  humidity?: number;
  windSpeed?: number;
};

export const Stadiums: Stadium[] = [
  {
    name: "잠실야구장",
    color: "#1d1838", // 두산 베어스
    flagCode: "JS_OB",
  },
  {
    name: "고척스카이돔",
    color: "#820023", // 키움 히어로즈
    flagCode: "GC",
  },
  {
    name: "인천SSG랜더스필드",
    color: "#c82430", // SSG 랜더스
    flagCode: "MH",
  },
  {
    name: "수원KT위즈파크",
    color: "#232323", // kt 위즈
    flagCode: "SW",
  },
  {
    name: "대구삼성라이온즈파크",
    color: "#124ca3", // 삼성 라이온즈
    flagCode: "DK",
  },
  {
    name: "사직야구장",
    color: "#002856", // 롯데 자이언츠
    flagCode: "SJ",
  },
  {
    name: "창원NC파크",
    color: "#204272", // NC 다이노스
    flagCode: "CW",
  },
  {
    name: "광주기아챔피언스필드",
    color: "#8f1622", // KIA 타이거즈
    flagCode: "KC",
  },
  {
    name: "대전 한화생명 볼파크",
    color: "#e76c1b", // 한화 이글스
    flagCode: "DN",
  },
  {
    name: "울산문수야구장",
    color: "#002856", // 울산 문수 야구장
    flagCode: "UL",
  },
  {
    name: "청주야구장",
    color: "#e76c1b", // 청주 야구장
    flagCode: "CJ",
  },
  {
    name: "포항야구장",
    color: "#124ca3", // 포항 야구장
    flagCode: "PH",
  },
];
