import bg_map from "../../../assets/bg_map.png";
import { Stadium, Stadiums } from "../../../types/Stadium";
import { useState } from "react";
import {
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRainWind,
  CloudSnow,
} from "lucide-react";

// 깃발 GIF import
import flag_GC from "/images/flag_GC.gif";
import flag_KC from "/images/flag_KC.gif";
import flag_DK from "/images/flag_DK.gif";
import flag_DN from "/images/flag_DN.gif";
import flag_MH from "/images/flag_MH.gif";
import flag_SJ from "/images/flag_SJ.gif";
import flag_SW from "/images/flag_SW.gif";
import flag_CW from "/images/flag_CW.gif";
import flag_JS_OB from "/images/flag_JS_OB.gif";
import flag_UL from "/images/flag_UL.gif";
import flag_CJ from "/images/flag_CJ.gif";
import flag_PH from "/images/flag_PH.gif";

interface KoreaMapProps {
  stadiums?: Stadium[];
  onStadiumClick?: (stadium: Stadium) => void;
}

export default function KoreaMap({ onStadiumClick }: KoreaMapProps) {
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);

  const handleStadiumClick = (flagCode: string) => {
    const stadium = Stadiums.find(s => s.flagCode === flagCode);
    if (stadium) {
      setSelectedStadium(stadium);
      onStadiumClick?.(stadium);
    }
  };

  return (
    <div className="flex h-148 w-152.5 flex-row justify-between rounded-2xl bg-white px-4 py-2">
      <div className="flex flex-col gap-2 py-18">
        <div
          className={`flex h-20 w-47 cursor-pointer flex-col rounded-lg border-1 transition-all duration-200 ${
            selectedStadium?.flagCode === "JS_OB"
              ? "scale-105 border-[var(--primary)] bg-[var(--surface-2)]"
              : "border-[var(--surface-3)] bg-[var(--surface-1)]"
          } pt-3 pr-3 pb-2 pl-4`}
          onClick={() => handleStadiumClick("JS_OB")}
        >
          <div className="t-caption text-[var(--on-surface-grey1)]">
            잠실야구장
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="t-body1 text-[var(--on-surface-default)]">19도</div>
            <div>
              <SunMedium size={32} className="text-[var(--on-surface-grey1)]" />
            </div>
          </div>
        </div>
        <div
          className={`flex h-20 w-47 cursor-pointer flex-col rounded-lg border-1 transition-all duration-200 ${
            selectedStadium?.flagCode === "GC"
              ? "scale-105 border-[var(--primary)] bg-[var(--surface-2)]"
              : "border-[var(--surface-3)] bg-[var(--surface-1)]"
          } pt-3 pr-3 pb-2 pl-4`}
          onClick={() => handleStadiumClick("GC")}
        >
          <div className="t-caption text-[var(--on-surface-grey1)]">
            고척스카이돔
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="t-body1 text-[var(--on-surface-default)]">21도</div>
            <div>
              <CloudSun size={32} className="text-[var(--on-surface-grey1)]" />
            </div>
          </div>
        </div>

        <div
          className={`flex h-20 w-47 cursor-pointer flex-col rounded-lg border-1 transition-all duration-200 ${
            selectedStadium?.flagCode === "KC"
              ? "scale-105 border-[var(--primary)] bg-[var(--surface-2)]"
              : "border-[var(--surface-3)] bg-[var(--surface-1)]"
          } pt-3 pr-3 pb-2 pl-4`}
          onClick={() => handleStadiumClick("KC")}
        >
          <div className="t-caption text-[var(--on-surface-grey1)]">
            광주기아챔피언스필드
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="t-body1 text-[var(--on-surface-default)]">23도</div>
            <div>
              <Cloud size={32} className="text-[var(--on-surface-grey1)]" />
            </div>
          </div>
        </div>

        <div
          className={`flex h-20 w-47 cursor-pointer flex-col rounded-lg border-1 transition-all duration-200 ${
            selectedStadium?.flagCode === "DK"
              ? "scale-105 border-[var(--primary)] bg-[var(--surface-2)]"
              : "border-[var(--surface-3)] bg-[var(--surface-1)]"
          } pt-3 pr-3 pb-2 pl-4`}
          onClick={() => handleStadiumClick("DK")}
        >
          <div className="t-caption text-[var(--on-surface-grey1)]">
            대구삼성라이온즈파크
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="t-body1 text-[var(--on-surface-default)]">25도</div>
            <div>
              <CloudLightning
                size={32}
                className="text-[var(--on-surface-grey1)]"
              />
            </div>
          </div>
        </div>

        <div
          className={`flex h-20 w-47 cursor-pointer flex-col rounded-lg border-1 transition-all duration-200 ${
            selectedStadium?.flagCode === "SJ"
              ? "scale-105 border-[var(--primary)] bg-[var(--surface-2)]"
              : "border-[var(--surface-3)] bg-[var(--surface-1)]"
          } pt-3 pr-3 pb-2 pl-4`}
          onClick={() => handleStadiumClick("SJ")}
        >
          <div className="t-caption text-[var(--on-surface-grey1)]">
            사직야구장
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="t-body1 text-[var(--on-surface-default)]">18도</div>
            <div>
              <CloudRainWind
                size={32}
                className="text-[var(--on-surface-grey1)]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative aspect-[0.627] w-92.75">
        {/* 배경 레이어 */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/images/bg_map.png')] bg-right bg-no-repeat opacity-45" />
        {/* 마커 등 지도 위 요소 */}
        <div className="absolute inset-0 z-10 h-full w-full">
          {/* 고척스카이돔 */}
          <a
            className={`absolute top-[23.8%] left-[29.7%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "GC" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("GC")}
          >
            {selectedStadium?.flagCode === "GC" ? (
              <img
                src={flag_GC}
                alt="GC"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 광주기아챔피언스필드 */}
          <a
            className={`absolute top-[66.5%] left-[28.7%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "KC" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("KC")}
          >
            {selectedStadium?.flagCode === "KC" ? (
              <img
                src={flag_KC}
                alt="KC"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 대구삼성라이온즈파크 */}
          <a
            className={`absolute top-[54.1%] left-[71.6%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "DK" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("DK")}
          >
            {selectedStadium?.flagCode === "DK" ? (
              <img
                src={flag_DK}
                alt="DK"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 대전 한화생명 볼파크 */}
          <a
            className={`absolute top-[45.2%] left-[42.3%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "DN" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("DN")}
          >
            {selectedStadium?.flagCode === "DN" ? (
              <img
                src={flag_DN}
                alt="DN"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 인천SSG랜더스필드 */}
          <a
            className={`absolute top-[25%] left-[24.3%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "MH" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("MH")}
          >
            {selectedStadium?.flagCode === "MH" ? (
              <img
                src={flag_MH}
                alt="MH"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 사직야구장 */}
          <a
            className={`absolute top-[66.5%] left-[78.5%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "SJ" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("SJ")}
          >
            {selectedStadium?.flagCode === "SJ" ? (
              <img
                src={flag_SJ}
                alt="SJ"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 수원KT위즈파크 */}
          <a
            className={`absolute top-[28.1%] left-[32.1%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "SW" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("SW")}
          >
            {selectedStadium?.flagCode === "SW" ? (
              <img
                src={flag_SW}
                alt="SW"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 창원NC파크 */}
          <a
            className={`absolute top-[66.5%] left-[69.9%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "CW" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("CW")}
          >
            {selectedStadium?.flagCode === "CW" ? (
              <img
                src={flag_CW}
                alt="CW"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 잠실야구장 */}
          <a
            className={`absolute top-[23.3%] left-[34.3%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "JS_OB" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("JS_OB")}
          >
            {selectedStadium?.flagCode === "JS_OB" ? (
              <img
                src={flag_JS_OB}
                alt="JS_OB"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 울산문수야구장 */}
          <a
            className={`absolute top-[59.6%] left-[83.9%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "UL" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("UL")}
          >
            {selectedStadium?.flagCode === "UL" ? (
              <img
                src={flag_UL}
                alt="UL"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 청주야구장 */}
          <a
            className={`absolute top-[40.5%] left-[42.6%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "CJ" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("CJ")}
          >
            {selectedStadium?.flagCode === "CJ" ? (
              <img
                src={flag_CJ}
                alt="CJ"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
          {/* 포항야구장 */}
          <a
            className={`absolute top-[51.4%] left-[85%] h-2 w-2 cursor-pointer ${selectedStadium?.flagCode === "PH" ? "!h-[32px] !w-[27px]" : ""}`}
            onClick={() => handleStadiumClick("PH")}
          >
            {selectedStadium?.flagCode === "PH" ? (
              <img
                src={flag_PH}
                alt="PH"
                className="absolute -top-[17px] -left-[4px] h-[32px] w-[27px]"
              />
            ) : (
              <i className="block h-full w-full rounded-full bg-[#616476]"></i>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
