import { useState, useRef, useEffect } from "react";
import {
  Edit3,
  ChevronRight,
  CheckCircle2,
  X,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { homeApi } from "../../../api/home/apis";
import { TeamId, getTeamInfo } from "../../../types/Type";

interface MatchingData {
  haveTicket: any;
  postIdx: number;
  title: string;
  stadiumIdx: number;
  gameIdx: number;
  context: string;
  userNickname: string;
  userCheeringTeamId: TeamId;
  status: number;
  createdAt: string;
  preferredMatchDate: string;
}

export default function NewMatchingList() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [matchings, setMatchings] = useState<MatchingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const fetchMatchings = async () => {
      try {
        setIsLoading(true);
        const data = await homeApi.getRecentMatchingPosts();
        const convertedData: MatchingData[] = data.map(item => ({
          ...item,
          userCheeringTeamId: Number(item.userCheeringTeamId) as TeamId,
        }));
        setMatchings(convertedData);
        setError(null);
        setTimeout(checkScroll, 0);
      } catch (err) {
        setError("매칭 목록을 불러오는데 실패했습니다.");
        console.error("Error fetching matchings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchings();
  }, []);

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

  const handleViewAll = () => {
    navigate("/matching");
  };

  const handleMatchingClick = (postIdx: number) => {
    navigate(`/matching/articles/${postIdx}`);
  };

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const hasOverflow = scrollWidth > clientWidth;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(
        hasOverflow && scrollLeft < scrollWidth - clientWidth - 1,
      );
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300; // 한 번에 스크롤할 픽셀 양
      const newScrollLeft =
        direction === "left"
          ? containerRef.current.scrollLeft - scrollAmount
          : containerRef.current.scrollLeft + scrollAmount;

      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll(); // 초기 상태 체크
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  return (
    <div className="flex w-252.5 flex-col md:w-180 xl:w-252.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit3 size={24} className="text-[var(--on-surface-grey1)]" />
          <h3 className="t-h3 text-[var(--on-surface-grey1)]">
            최신 직관 매칭 글
          </h3>
        </div>
        <button
          onClick={handleViewAll}
          className="t-button2 flex items-center gap-2.5 text-[var(--on-surface-grey1)] transition-colors hover:text-[#007bff]"
        >
          모두 보기
          <ChevronRight
            size={24}
            className="text-[var(--on-surface-grey1)] group-hover:text-[#007bff]"
          />
        </button>
      </div>
      <p className="t-body1 mb-4 text-[var(--on-surface-grey1)]">
        최근에 추가된 직관 매칭 글을 확인해보세요!
      </p>
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
          >
            <ChevronLeft size={24} className="text-[var(--on-surface-grey1)]" />
          </button>
        )}
        <div
          ref={containerRef}
          className="flex w-252.5 cursor-grab gap-4 overflow-x-scroll select-none [-ms-overflow-style:'none'] [scrollbar-width:'none'] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={checkScroll}
        >
          {isLoading ? (
            <div className="flex h-41 w-73 items-center justify-center">
              <span className="t-body1 text-[var(--on-surface-grey2)]">
                로딩 중...
              </span>
            </div>
          ) : error ? (
            <div className="flex h-41 w-73 items-center justify-center">
              <span className="t-body1 text-[var(--on-surface-grey2)]">
                {error}
              </span>
            </div>
          ) : matchings.length === 0 ? (
            <div className="flex h-41 w-73 items-center justify-center">
              <span className="t-body1 text-[var(--on-surface-grey2)]">
                매칭 목록이 없습니다.
              </span>
            </div>
          ) : (
            matchings.map(matching => (
              <div
                key={matching.postIdx}
                onClick={() => handleMatchingClick(matching.postIdx)}
                className="flex h-41 w-73 flex-shrink-0 cursor-pointer flex-col justify-between rounded-xl bg-[var(--surface-1)] p-4 transition-colors hover:bg-blue-100"
              >
                <div className="mb-3 flex h-8 items-center justify-between">
                  <div className="t-caption text-[var(--on-surface-grey2)]">
                    {matching.userNickname}
                  </div>
                  <img
                    src={`/images/${getTeamInfo(matching.userCheeringTeamId).logo}.png`}
                    alt={getTeamInfo(matching.userCheeringTeamId).name}
                    className="h-8 w-8 rounded-full border border-[var(--divider-dv2)] bg-white object-contain"
                  />
                </div>
                <div className="flex h-8 items-center justify-between">
                  <span className="t-caption text-[var(--on-surface-default)]">
                    제목
                  </span>
                  <span className="t-caption text-[var(--on-surface-default)]">
                    {matching.title}
                  </span>
                </div>
                <div className="flex h-8 items-center justify-between">
                  <span className="t-caption text-[var(--on-surface-default)]">
                    선호 경기일
                  </span>
                  <span className="t-caption text-[var(--on-surface-default)]">
                    {matching.preferredMatchDate}
                  </span>
                </div>
                <div className="flex h-8 items-center justify-between">
                  <span className="t-caption text-[var(--on-surface-default)]">
                    티켓 보유여부
                  </span>
                  <span className="t-caption flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-3)] text-[var(--on-surface-default)]">
                    {matching.haveTicket ? (
                      <CheckCircle2
                        size={16}
                        className="text-[var(--on-surface-default)]"
                      />
                    ) : (
                      <X
                        size={16}
                        className="text-[var(--on-surface-default)]"
                      />
                    )}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        {showRightArrow && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
          >
            <ChevronRight
              size={24}
              className="text-[var(--on-surface-grey1)]"
            />
          </button>
        )}
      </div>
    </div>
  );
}
