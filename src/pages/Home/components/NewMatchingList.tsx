import { useState, useRef } from "react";
import { Edit3, ChevronRight, CheckCircle2, X } from "lucide-react";

interface MatchingData {
  userNickname: string;
  teamName: string;
  teamLogo: string;
  matchDate: string;
  hasTicket: boolean;
}

const mockMatching: MatchingData = {
  userNickname: "야구 좋아",
  teamName: "롯데",
  teamLogo: "/images/lotte_emb.png",
  matchDate: "04.22",
  hasTicket: false,
};

export default function NewMatchingList() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (containerRef.current) {
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = x - startX;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="w-252.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit3 size={24} className="text-[var(--on-surface-grey1)]" />
          <h3 className="t-h3 text-[var(--on-surface-grey1)]">
            최신 직관 매칭 글
          </h3>
        </div>
        <button className="t-button2 flex items-center gap-2.5 text-[var(--on-surface-grey1)]">
          모두 보기
          <ChevronRight size={24} className="text-[var(--on-surface-grey1)]" />
        </button>
      </div>
      <p className="t-body1 mb-4 text-[var(--on-surface-grey1)]">
        최근에 추가된 직관 매칭 글을 확인해보세요!
      </p>
      {/* 최신 직관 매칭 글 목록 */}
      <div
        ref={containerRef}
        className="flex w-252.5 cursor-grab gap-4 overflow-x-scroll select-none [-ms-overflow-style:'none'] [scrollbar-width:'none'] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex h-41 w-73 flex-shrink-0 flex-col justify-between rounded-xl bg-[var(--surface-1)] p-4"
          >
            <div className="t-caption mb-3 text-[var(--on-surface-grey2)]">
              {mockMatching.userNickname}
            </div>
            <div className="flex h-8 items-center justify-between">
              <span className="t-caption text-[var(--on-surface-default)]">
                응원하는 팀
              </span>
              <img
                src={mockMatching.teamLogo}
                alt={mockMatching.teamName}
                className="h-8 w-8 rounded-full border border-[var(--divider-dv2)] bg-white object-contain"
              />
            </div>
            <div className="flex h-8 items-center justify-between">
              <span className="t-caption text-[var(--on-surface-default)]">
                선호 경기일
              </span>
              <span className="t-caption text-[var(--on-surface-default)]">
                {mockMatching.matchDate}
              </span>
            </div>
            <div className="flex h-8 items-center justify-between">
              <span className="t-caption text-[var(--on-surface-default)]">
                티켓 보유여부
              </span>
              <span className="t-caption flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-3)] text-[var(--on-surface-default)]">
                {mockMatching.hasTicket ? (
                  <CheckCircle2
                    size={16}
                    className="text-[var(--on-surface-default)]"
                  />
                ) : (
                  <X size={16} className="text-[var(--on-surface-default)]" />
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
