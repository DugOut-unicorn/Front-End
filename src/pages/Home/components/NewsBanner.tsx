// src/components/NewsBanner.tsx
import React, { useState, useEffect } from "react";

export default function NewsBanner() {
  const total = 8;
  const [current, setCurrent] = useState(0);

  // 자동 슬라이드 기능
  useEffect(() => {
    // const timer = setInterval(() => {
    //   setCurrent(prev => (prev + 1) % total);
    // }, 5000); // 5초마다 슬라이드 변경
    // return () => clearInterval(timer);
  }, [total]);

  const newsItems = [
    {
      title:
        "치열했던 KIA 5선발 경쟁, 탈락한 자의 품격... 이범호는 왜 말 한 마디에 감동했나",
      image: "/images/newsbannerimg.png",
    },
    {
      title: "두 번째 뉴스 제목",
      image: "/images/newsbannerimg.png",
    },
    // ... 나머지 뉴스 항목들
  ];

  return (
    <div className="relative flex h-[546px] w-[789px] flex-col items-start justify-end">
      <div className="absolute inset-0 overflow-hidden">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ${
              index === current ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <img
              src={item.image}
              alt={`news-${index}`}
              className="h-[526px] w-full rounded-[16px] object-cover"
            />
          </div>
        ))}
      </div>
      <div className="relative flex w-full -translate-y-[12px] flex-col items-start px-5 pb-5">
        <h3 className="t-h2 text-white">{newsItems[current].title}</h3>
      </div>
      {/* 인디케이터 */}
      <div className="flex w-full items-center justify-center gap-[8px]">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-[8px] w-[8px] cursor-pointer rounded-full ${
              i === current
                ? "bg-[var(--on-surface-default)]"
                : "bg-[var(--on-surface-grey2)]"
            } `}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
