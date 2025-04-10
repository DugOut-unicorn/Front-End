import bg_map from "../../../assets/bg_map.png";
import { Stadium, Stadiums } from "../../../types/Stadium";
import { useState } from "react";

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
    <div
      className="relative box-border h-[584px] w-[506px] rounded-[13px] bg-[#f0f0f0] bg-[26px] bg-no-repeat p-[26px_9px_26px_24px]"
      style={{ backgroundImage: `url(${bg_map})` }}
    >
      <ul className="location-wrap absolute top-1/2 left-[24px] z-10 w-[148px] -translate-y-1/2 transform">
        {[...Array(5)].map((_, index) => {
          // 임시 데이터 사용, 실제로는 stadium 데이터를 받아와야 함
          const tempStadium = Stadiums[index];
          const isSelected = selectedStadium?.flagCode === tempStadium.flagCode;

          return (
            <li
              key={index}
              className={`cursor-pointer px-1.5 pb-4 transition-transform duration-200 ease-in-out ${isSelected ? "scale-110" : ""}`}
            >
              <dl
                className="location-box mx-auto w-[120px] rounded-[7px] shadow-md"
                onClick={() => handleStadiumClick(tempStadium.flagCode)}
              >
                <dt
                  className={`h-[24px] rounded-t-[7px] bg-${tempStadium.color} text-center text-[11px] leading-[24px] text-white`}
                >
                  {tempStadium.name}
                </dt>
                <dd className="align-content-center box-border h-[60px] rounded-b-[7px] bg-white p-[4px_9px] text-[10px] leading-[1.4]">
                  <img
                    src="/images/weather_icon.png"
                    alt="weather"
                    className="inline-block h-[24px] w-[26px]"
                  />
                  <span className="celsius ml-[3px] text-[13px] leading-[24px] font-bold">
                    19°C
                  </span>
                  <p>강수확률 30%</p>
                </dd>
              </dl>
            </li>
          );
        })}
      </ul>
      <div className="absolute inset-0">
        {/* 고척스카이돔 */}
        <a
          className={`absolute top-[140px] left-[236px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "GC" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[386px] left-[233px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "KC" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[315px] left-[392px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "DK" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[263px] left-[283px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "DN" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[147px] left-[216px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "MH" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[386px] left-[418px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "SJ" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[165px] left-[246px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "SW" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[386px] left-[385px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "CW" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[137px] left-[254px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "JS_OB" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[347px] left-[437px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "UL" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[236px] left-[285px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "CJ" ? "!h-[32px] !w-[27px]" : ""}`}
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
          className={`absolute top-[299px] left-[440px] h-[10px] w-[10px] cursor-pointer ${selectedStadium?.flagCode === "PH" ? "!h-[32px] !w-[27px]" : ""}`}
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
  );
}
