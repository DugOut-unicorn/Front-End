import { useState, useRef, useEffect } from "react";
import { Edit3, ChevronRight, CheckCircle2, X } from "lucide-react";
import { homeApi } from "../../../api/home/apis";
import { TeamId, getTeamInfo } from "../../../types/Type";

interface MatchingData {
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

  return (
    <div className="flex w-252.5 flex-col md:w-180 xl:w-252.5">
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
              className="flex h-41 w-73 flex-shrink-0 flex-col justify-between rounded-xl bg-[var(--surface-1)] p-4"
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
                  {matching.status === 1 ? (
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
          ))
        )}
      </div>
    </div>
  );
}
