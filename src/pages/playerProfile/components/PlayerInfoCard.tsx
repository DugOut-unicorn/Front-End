import React from "react";

export default function PlayerInfoCard() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      {/* 배경 이미지 */}
      <img
        src="/images/stadium_bg.jpg"
        alt="Stadium Background"
        className="w-full h-64 object-cover opacity-70"
      />

      {/* 반투명 레이어 위에 내용 */}
      <div className="absolute inset-0 flex items-center gap-6 bg-black bg-opacity-30 px-6 py-4">
        {/* 선수 사진 */}
        <img
          src="/images/반즈.png"
          alt="반조"
          className="w-28 h-32 rounded-md object-cover border-2 border-white"
        />

        {/* 정보 텍스트 */}
        <div className="text-white text-sm leading-relaxed">
            <div className="text-base font-bold mb-1">반조</div>
            <div>롯데 자이언츠 &nbsp;&nbsp; NO.28 &nbsp;&nbsp; 투수(좌투좌타)</div>

            <div className="mt-2 grid grid-cols-4 gap-x-1 gap-y-1">
                <span>입단</span><span>2022년 1월</span>
                <span>신체</span><span>189cm 91kg</span>
                
                <span>출생</span><span>1995년 10월 1일</span>
                <span>학력</span><span>미국 Clemson(대)</span>
            </div>
        </div>
      </div>
    </div>
  );
}
