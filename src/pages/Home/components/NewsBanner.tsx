import React, { useState } from "react";
import { Link } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title:
      "치열했던 KIA 5선발 경쟁, 탈락한 자의 품격... 이범호는 왜 말 한 마디에 감동했나",
    image: "/images/newsbannerimg.png",
    link: "/news/1",
  },
  // 추가 뉴스 데이터...
];

export default function NewsBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="relative h-[400px] w-full overflow-hidden pb-16">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm">
        <img
          src={newsData[currentSlide].image}
          alt="뉴스 이미지"
          className="h-full w-full object-cover"
          style={{
            filter: "brightness(0.4)",
          }}
        />
      </div>

      {/* 컨텐츠 영역 */}
      <div className="relative z-10 mx-auto h-full max-w-[1080px] px-4 pt-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          {/* 텍스트 영역 */}
          <div className="text-white md:w-2/3">
            <h2 className="mb-6 max-w-[600px] text-[32px] leading-tight font-bold">
              {newsData[currentSlide].title}
            </h2>
            {/* 기사 자세히 보기 버튼 */}
            <Link
              to={newsData[currentSlide].link}
              className="inline-flex items-center rounded-xl border-2 border-white bg-transparent px-4 py-2 text-base font-medium text-white transition hover:bg-white hover:text-black"
            >
              기사 자세히 보기 →
            </Link>
          </div>

          {/* 이미지 영역 */}
          <div className="mt-8 flex justify-center md:mt-0 md:w-1/3">
            <img
              src={newsData[currentSlide].image}
              alt="뉴스 이미지"
              className="h-auto w-full max-w-[300px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* 슬라이드 인디케이터 (배너 하단 중앙 배치) */}
      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {[...Array(10)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </section>
  );
}
