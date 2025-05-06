// src/components/TeamOverviewSection.tsx
import React, { useState } from "react";
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
  teams,
  month = new Date(),
  onMonthChange,
}: TeamOverviewContainerProps) {
  return (
    <div className="xs:flex-col flex w-252.5 flex-col items-center gap-4 md:flex-col xl:flex-row">
      <TeamRankingTable teams={teams} />
      <TeamScheduleSection month={month} onMonthChange={onMonthChange} />
    </div>
  );
}
