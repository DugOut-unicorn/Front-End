import { useState, useEffect } from "react";
import { homeApi } from "../../../api/home/apis";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        const formattedNews = news.map(item => ({
          title: item.title,
          imageUrl: item.imageUrl,
          url: item.url,
        }));

        setNewsItems(formattedNews);
        setError(null);
      } catch (err) {
        setError("뉴스를 불러오는데 실패했습니다.");
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

  const goToPrev = () => {
    setCurrent(prev => (prev - 1 + total) % total);
  };

  const goToNext = () => {
    setCurrent(prev => (prev + 1) % total);
  };

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
      <div className="absolute inset-0">
        {/* 좌우 캐로셀 버튼 */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
          aria-label="이전 뉴스"
        >
          <ChevronLeft size={24} className="text-[var(--on-surface-grey1)]" />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-0 z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
          aria-label="다음 뉴스"
        >
          <ChevronRight size={24} className="text-[var(--on-surface-grey1)]" />
        </button>
        {/* 슬라이드 전체를 감싸는 래퍼에만 overflow-hidden, rounded-2xl 적용 */}
        <div className="relative h-[526px] w-full overflow-hidden rounded-2xl">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-500 ${
                index === current ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {item.imageUrl ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <div className="relative h-full w-full">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      onError={e => {
                        e.currentTarget.src = "/images/newsbannerimg.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.7))] opacity-80" />
                  </div>
                </a>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <span className="text-gray-500">
                    이미지를 불러올 수 없습니다
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
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
