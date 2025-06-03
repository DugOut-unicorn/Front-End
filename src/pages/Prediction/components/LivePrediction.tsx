import { Zap, RefreshCw } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

interface Matchup {
  leftTeam: {
    name: string;
    logo: string;
    percent: number;
  };
  rightTeam: {
    name: string;
    logo: string;
    percent: number;
  };
}

const initialMatchups: Matchup[] = [
  {
    leftTeam: { name: "두산", logo: "doosan", percent: 32 },
    rightTeam: { name: "KIA", logo: "kia", percent: 68 },
  },
  {
    leftTeam: { name: "SSG", logo: "ssg", percent: 31 },
    rightTeam: { name: "삼성", logo: "samsung", percent: 69 },
  },
  {
    leftTeam: { name: "롯데", logo: "lotte", percent: 73 },
    rightTeam: { name: "키움", logo: "kiwoom", percent: 27 },
  },
  {
    leftTeam: { name: "NC", logo: "nc", percent: 35 },
    rightTeam: { name: "LG", logo: "lg", percent: 65 },
  },
  {
    leftTeam: { name: "한화", logo: "hanwha", percent: 75 },
    rightTeam: { name: "KT", logo: "kt", percent: 25 },
  },
];

function getRandomizedMatchups() {
  return initialMatchups.map(m => {
    const left = Math.floor(Math.random() * 71) + 15;
    const right = 100 - left;
    return {
      ...m,
      leftTeam: { ...m.leftTeam, percent: left },
      rightTeam: { ...m.rightTeam, percent: right },
    };
  });
}

// 팀별 색상 가져오기 함수
function getTeamColor(teamLogo: string) {
  // teamLogo는 예: 'lg', 'kiwoom' 등
  const cssVar = `--team-${teamLogo}`;
  if (typeof window !== "undefined") {
    return (
      getComputedStyle(document.documentElement).getPropertyValue(cssVar) ||
      "#888"
    );
  }
  return "#888";
}

export default function LivePrediction() {
  const [matchups, setMatchups] = useState<Matchup[]>(initialMatchups);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleRefresh = () => {
    setMatchups(getRandomizedMatchups());
    setSelectedIdx(null);
  };

  const selected = selectedIdx !== null ? matchups[selectedIdx] : null;
  const pieData = selected
    ? [
        {
          name: selected.leftTeam.name,
          value: selected.leftTeam.percent,
        },
        {
          name: selected.rightTeam.name,
          value: selected.rightTeam.percent,
        },
      ]
    : [];

  // 우세 팀 텍스트
  let winnerText = "";
  if (selected) {
    if (selected.leftTeam.percent > selected.rightTeam.percent) {
      winnerText = `${selected.leftTeam.name} 우세`;
    } else if (selected.leftTeam.percent < selected.rightTeam.percent) {
      winnerText = `${selected.rightTeam.name} 우세`;
    } else {
      winnerText = "동률";
    }
  }

  const pieColors = selected
    ? [
        getTeamColor(selected.leftTeam.logo),
        getTeamColor(selected.rightTeam.logo),
      ]
    : ["#A92B53", "#4B131B"];

  // 커스텀 라벨 렌더러
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    index: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 18;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill={pieColors[index]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={16}
        fontWeight={600}
      >
        {pieData[index].value}%
      </text>
    );
  };

  return (
    <div className="flex h-[730px] w-[497px] flex-1 flex-col rounded-lg border border-[#E5EAF2] bg-white p-6 pb-10">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Zap size={24} className="text-[var(--on-surface-grey1)]" />
          <h3 className="t-h3 text-[var(--on-surface-grey1)]">
            실시간 승부 예측
          </h3>
        </div>
        <button
          onClick={handleRefresh}
          className="rounded p-1 transition hover:bg-gray-100"
          title="새로고침"
        >
          <RefreshCw size={22} className="text-[var(--on-surface-grey2)]" />
        </button>
      </div>
      <p className="t-body1 mb-6 text-[var(--on-surface-grey1)]">
        현재 진행 중인 경기의 승부 예측 결과입니다.
      </p>
      <div className="flex w-full flex-col gap-2">
        {matchups.map((match, idx) => {
          const leftWin = match.leftTeam.percent > match.rightTeam.percent;
          return (
            <div
              key={idx}
              className={`flex cursor-pointer items-center justify-between rounded-lg border-2 bg-[#edeef3] px-4 py-2 transition ${selectedIdx === idx ? "border-[#A92B53] bg-[#f7eaf0]" : "border-transparent"}`}
              onClick={() => setSelectedIdx(idx)}
            >
              {/* 왼쪽 팀 */}
              <div className="flex w-32 items-center justify-start gap-2">
                <span className="t-body1 w-10 text-right text-black">
                  {match.leftTeam.name}
                </span>
                <img
                  src={`/images/${match.leftTeam.logo}_emb.png`}
                  alt={match.leftTeam.name}
                  className="h-6 w-9 object-contain"
                />
              </div>
              {/* 확률 */}
              <div className="flex min-w-[140px] items-center justify-center gap-2 rounded-full bg-[#d6d7e1] px-4 py-1">
                <span
                  className={`t-h3 ${leftWin ? "font-bold text-black" : "text-[#888]"}`}
                >
                  {match.leftTeam.percent}%
                </span>
                <span
                  className={`t-h3 ${!leftWin ? "font-bold text-black" : "text-[#888]"}`}
                >
                  {match.rightTeam.percent}%
                </span>
              </div>
              {/* 오른쪽 팀 */}
              <div className="flex w-32 items-center justify-end gap-2">
                <img
                  src={`/images/${match.rightTeam.logo}_emb.png`}
                  alt={match.rightTeam.name}
                  className="h-6 w-9 object-contain"
                />
                <span className="t-body1 w-10 text-left text-black">
                  {match.rightTeam.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* 도넛 차트 */}
      {selected && (
        <div className="mt-4 flex flex-col items-center">
          <div className="t-body1 mb-2 text-[var(--on-surface-grey2)]">
            {winnerText}
          </div>
          <PieChart width={260} height={220}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              paddingAngle={1}
              label={renderCustomizedLabel}
              labelLine={true}
            >
              {pieData.map((_, i) => (
                <Cell key={`cell-${i}`} fill={pieColors[i]} />
              ))}
            </Pie>
          </PieChart>
          <div className="mt-2 flex gap-6">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded"
                style={{ background: pieColors[0] }}
              ></span>
              <span className="t-body2 text-black">
                {selected.leftTeam.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded"
                style={{ background: pieColors[1] }}
              ></span>
              <span className="t-body2 text-black">
                {selected.rightTeam.name}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
