import { useState } from "react";
import { Edit3, ChevronRight } from "lucide-react";

interface MatchingData {
  status: string;
  teamName: string;
  teamLogo: string;
  matchDate: string;
  hasTicket: boolean;
}

const mockMatching: MatchingData = {
  status: "야구 좋아",
  teamName: "롯데",
  teamLogo: "/images/lotte_emb.png",
  matchDate: "04.22",
  hasTicket: false,
};

export default function NewMatchingList() {
  return (
    <div className="mx-auto mb-5 w-[1010px] px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit3 className="h-5 w-5 text-[var(--on-surface-grey1)]" />
          <h3 className="t-h3 mb-2 text-[var(--on-surface-grey1)]">
            최신 직관 매칭 글
          </h3>
        </div>
        <button className="t-button2 flex items-center gap-1 text-[var(--on-surface-grey1)]">
          모두 보기
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <p className="t-body1 mb-4 text-[var(--on-surface-grey1)]">
        최근에 추가된 직관 매칭 글을 확인해보세요!
      </p>
      <div className="mt-8 flex justify-center gap-4 px-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-[164px] w-[292px] flex-shrink-0">
            <div className="flex h-full w-full flex-col justify-between rounded-[12px] bg-[var(--surface-1)] p-4">
              <div className="t-caption mb-2 text-[var(--on-surface-grey2)]">
                {mockMatching.status}
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="t-caption text-[var(--on-surface-grey2)]">
                  응원하는 팀
                </span>
                <div className="flex items-center gap-2">
                  <span className="t-caption text-[var(--on-surface-grey1)]">
                    {mockMatching.teamName}
                  </span>
                  <img
                    src={mockMatching.teamLogo}
                    alt={mockMatching.teamName}
                    className="h-5 w-5"
                  />
                </div>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="t-caption text-[var(--on-surface-grey2)]">
                  선호 경기일
                </span>
                <span className="t-caption text-[var(--on-surface-grey1)]">
                  {mockMatching.matchDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="t-caption text-[var(--on-surface-grey2)]">
                  티켓 보유여부
                </span>
                <span className="t-caption text-[var(--on-surface-grey1)]">
                  {mockMatching.hasTicket ? "O" : "X"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
