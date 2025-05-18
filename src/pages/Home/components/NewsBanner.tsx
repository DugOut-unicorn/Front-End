// src/components/NewsBanner.tsx
import React, { useState, useEffect } from "react";
import { homeApi } from "../../../api/home/apis";

interface NewsItem {
  title: string;
  imageUrl: string;
  url: string;
}

export default function NewsBanner() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await homeApi.getNewsFetch();
        console.log("API 응답 데이터:", news); // API 응답 데이터 로깅
        const formattedNews = news.map(item => ({
          title: item.title,
          imageUrl: item.imageUrl,
          url: item.url,
        }));
        console.log("가공된 뉴스 데이터:", formattedNews); // 가공된 데이터 로깅
        setNewsItems(formattedNews);
        setError(null);
      } catch (err) {
        setError("뉴스를 불러오는데 실패했습니다.");
        console.error("뉴스 데이터 로딩 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const total = newsItems.length;
  const [current, setCurrent] = useState(0);

  // 자동 슬라이드 기능
  useEffect(() => {
    if (total === 0) return;

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  if (isLoading) {
    return (
      <div className="relative flex h-[546px] w-[789px] items-center justify-center">
        <div className="text-lg">뉴스를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex h-[546px] w-[789px] items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <div className="relative flex h-[546px] w-[789px] items-center justify-center">
        <div className="text-lg">표시할 뉴스가 없습니다.</div>
      </div>
    );
  }

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
            {item.imageUrl ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <div className="relative h-[526px] w-full">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full rounded-2xl object-cover"
                    onError={e => {
                      e.currentTarget.src = "/images/newsbannerimg.png";
                    }}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.7))] opacity-80" />
                </div>
              </a>
            ) : (
              <div className="flex h-[526px] w-full items-center justify-center rounded-[16px] bg-gray-200">
                <span className="text-gray-500">
                  이미지를 불러올 수 없습니다
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="relative flex w-full -translate-y-[12px] flex-col items-start pr-30 pb-5 pl-5">
        <a
          href={newsItems[current]?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="t-h2 text-white">{newsItems[current]?.title}</h3>
        </a>
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
