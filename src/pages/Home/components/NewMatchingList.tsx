import { useState } from "react";

interface MatchingData {
  status: string;
  teamName: string;
  teamLogo: string;
  matchDate: string;
  hasTicket: boolean;
}

const mockMatchings: MatchingData[] = [
  {
    status: "야구 좋아",
    teamName: "롯데",
    teamLogo: "/images/lotte_emb.png",
    matchDate: "04.22",
    hasTicket: false,
  },
  {
    status: "야구 좋아",
    teamName: "롯데",
    teamLogo: "/images/lotte_emb.png",
    matchDate: "04.22",
    hasTicket: true,
  },
  {
    status: "야구 좋아",
    teamName: "롯데",
    teamLogo: "/images/lotte_emb.png",
    matchDate: "04.22",
    hasTicket: false,
  },
  {
    status: "야구 좋아",
    teamName: "롯데",
    teamLogo: "/images/lotte_emb.png",
    matchDate: "04.22",
    hasTicket: true,
  },
  {
    status: "야구 좋아",
    teamName: "롯데",
    teamLogo: "/images/lotte_emb.png",
    matchDate: "04.22",
    hasTicket: false,
  },
];

export default function NewMatchingList() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex(prev =>
      prev < mockMatchings.length - 3 ? prev + 1 : prev,
    );
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-[1080px] px-8">
        <div className="text-right">
          <h2 className="mb-2 text-2xl font-bold">최신 직관 매칭 글</h2>
          <p className="text-gray-600">
            최근에 추가된 직관 매칭 글을 확인해보세요!
          </p>
        </div>
        <div className="relative mt-8">
          <div className="flex justify-center gap-5 overflow-hidden px-2">
            {mockMatchings
              .slice(currentIndex, currentIndex + 3)
              .map((matching, index) => (
                <div key={index} className="w-[280px] flex-shrink-0">
                  <div className="w-full rounded-[32px] bg-white p-6">
                    <div className="mb-6 text-base font-medium">
                      {matching.status}
                    </div>
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-[14px]">응원하는 팀</span>
                      <div className="flex items-center gap-2">
                        <span>{matching.teamName}</span>
                        <img
                          src={matching.teamLogo}
                          alt={matching.teamName}
                          className="h-5 w-5"
                        />
                      </div>
                    </div>
                    <div className="mb-6 flex justify-between">
                      <span className="text-[14px]">선호 경기일</span>
                      <span>{matching.matchDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[14px]">티켓 보유 여부</span>
                      <span>{matching.hasTicket ? "O" : "X"}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -left-8 -translate-y-1/2 rounded-full bg-white p-3 transition-colors hover:bg-gray-100 disabled:opacity-50"
            disabled={currentIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -right-8 -translate-y-1/2 rounded-full bg-white p-3 transition-colors hover:bg-gray-100 disabled:opacity-50"
            disabled={currentIndex >= mockMatchings.length - 3}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
