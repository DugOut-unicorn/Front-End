import { Zap, RefreshCw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { aiApi } from "../../../api/ai/apis";
import { getEnglishTeamName } from "../../../hooks/TeamNameChanger";

interface Matchup {
  leftTeam: {
    name: string;
    logo: string;
    percent: number;
    score: number;
  };
  rightTeam: {
    name: string;
    logo: string;
    percent: number;
    score: number;
  };
  inning: number;
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
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [lastManualRefresh, setLastManualRefresh] = useState(0);

  const fetchPredictions = useCallback(
    async (isManualRefresh = false) => {
      // 수동 새로고침인 경우 쿨다운 체크
      if (isManualRefresh) {
        const now = Date.now();
        if (now - lastManualRefresh < 10000) {
          // 10초 쿨다운
          return;
        }
        setLastManualRefresh(now);
        setCooldown(10);
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await aiApi.getGamePrediction();

        const formattedMatchups: Matchup[] = data.map(game => ({
          leftTeam: {
            name: game.awayTeam,
            logo: getEnglishTeamName(game.awayTeam),
            percent: Math.round((1 - game.winProbability) * 100),
            score: game.awayAccumScore,
          },
          rightTeam: {
            name: game.homeTeam,
            logo: getEnglishTeamName(game.homeTeam),
            percent: Math.round(game.winProbability * 100),
            score: game.homeAccumScore,
          },
          inning: game.inning,
        }));

        setMatchups(formattedMatchups);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
        console.error("Failed to fetch predictions:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [lastManualRefresh],
  );

  useEffect(() => {
    fetchPredictions();
    // 1분마다 자동 갱신
    const interval = setInterval(() => fetchPredictions(false), 60000);
    return () => clearInterval(interval);
  }, [fetchPredictions]);

  // 쿨다운 타이머
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleRefresh = () => {
    fetchPredictions(true);
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
          className={`rounded p-1 transition ${
            cooldown > 0 || isLoading
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-100"
          }`}
          title={
            cooldown > 0 ? `${cooldown}초 후에 다시 시도해주세요` : "새로고침"
          }
          disabled={cooldown > 0 || isLoading}
        >
          <div className="relative">
            <RefreshCw
              size={22}
              className={`text-[var(--on-surface-grey2)] ${
                isLoading ? "animate-spin" : ""
              }`}
            />
            {cooldown > 0 && (
              <span className="absolute -top-2 -right-2 text-xs font-bold text-[var(--on-surface-grey1)]">
                {cooldown}
              </span>
            )}
          </div>
        </button>
      </div>
      <p className="t-body1 mb-4 text-[var(--on-surface-grey1)]">
        AI가 분석한 실시간 승률입니다. 이닝 종료 시 자동 갱신됩니다.
      </p>
      {error ? (
        <div className="flex h-40 items-center justify-center text-red-500">
          {error}
        </div>
      ) : isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <RefreshCw
            className="animate-spin text-[var(--on-surface-grey2)]"
            size={24}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2">
          {matchups.slice(0, 5).map((match, idx) => {
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
                  <span className="t-h3 font-bold text-black">
                    {match.leftTeam.score}
                  </span>
                </div>

                {/* 이닝 표시 */}
                <div className="flex min-w-[140px] items-center justify-center">
                  <div className="rounded-full bg-[#d6d7e1] px-4 py-1">
                    <span className="t-h3 font-bold text-black">
                      {/* {match.inning}회 */}
                      경기 종료
                    </span>
                  </div>
                </div>

                {/* 오른쪽 팀 */}
                <div className="flex w-32 items-center justify-end gap-2">
                  <span className="t-h3 font-bold text-black">
                    {match.rightTeam.score}
                  </span>
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
      )}
      {/* 도넛 차트 */}
      {selected && (
        <div className="mt-4 flex flex-col items-center">
          <div className="t-body1 text-[var(--on-surface-grey2)]">
            {winnerText}
          </div>
          <PieChart width={300} height={220}>
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
          <div className="flex gap-6">
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
