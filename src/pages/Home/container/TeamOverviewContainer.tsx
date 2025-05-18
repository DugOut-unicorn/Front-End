// src/components/TeamOverviewSection.tsx
import React, { useState, useEffect } from "react";
import {
  ListOrdered,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { TeamRankingTable } from "../components/TeamRankingTable";
import { TeamScheduleSection } from "../components/TeamScheduleSection";
import { homeApi } from "../../../api/home/apis";

export interface Team {
  id: string;
  logo: string;
  name: string;
  games: number;
  wins: number;
  draws: number;
  losses: number;
}

export interface TeamOverviewContainerProps {
  teams: Team[]; // 순위 데이터 (최대 10개)
  month?: Date; // 보여줄 달 (기본: 오늘)
  onMonthChange?: (d: Date) => void;
}

export function TeamOverviewContainer({
  month = new Date(),
  onMonthChange,
}: Omit<TeamOverviewContainerProps, "teams">) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const teamData = await homeApi.getTeamRanking();
        setTeams(teamData);
      } catch (error) {
        console.error("팀 순위 데이터를 가져오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[620px] w-[497px] items-center justify-center bg-[var(--surface-2)]">
        <div className="text-[var(--on-surface-grey1)]">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="xs:flex-col flex w-252.5 flex-col items-center gap-4 md:flex-col xl:flex-row">
      <TeamRankingTable teams={teams} />
      <TeamScheduleSection month={month} onMonthChange={onMonthChange} />
    </div>
  );
}
