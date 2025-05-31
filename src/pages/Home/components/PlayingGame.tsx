import { useEffect, useState } from "react";
import GameRow from "./GameRow";
import { homeApi } from "../../../api/home/apis";
import { aiApi } from "../../../api/ai/apis";
import {
  getTeamNameByIdx,
  getTeamLogoByIdx,
  getEnglishTeamName,
} from "../../../hooks/TeamNameChanger";
import { AIPredictionDTO } from "../../../types/ai";
import PredictionRow from "./PredictionRow";

interface GameResult {
  homeTeamIdx: number;
  awayTeamIdx: number;
  homeScore: number;
  awayScore: number;
}

export default function PlayingGame() {
  const [recentResults, setRecentResults] = useState<GameResult[]>([]);
  const [predictions, setPredictions] = useState<AIPredictionDTO[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await homeApi.getRecentResults();
        setRecentResults(data.results);
      } catch (error) {
        console.error("최근 경기 결과를 불러오는데 실패했습니다:", error);
      }
    };

    const fetchPredictions = async () => {
      try {
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식
        const data = await aiApi.getWinProbability(today);
        setPredictions(data);
      } catch (error) {
        console.error("승부 예측을 불러오는데 실패했습니다:", error);
      }
    };

    fetchResults();
    fetchPredictions();
  }, []);

  return (
    <div className="flex h-[526px] w-[395px] flex-row gap-5 rounded-[16px] bg-[var(--surface-1)] p-4 xl:flex-col">
      <div className="border-b border-[var(--divider-dv2)]">
        <div className="t-caption-sb mb-1 text-[var(--on-surface-grey2)]">
          경기 승부 예측
        </div>
        <div className="mb-1 flex flex-col gap-1">
          {predictions.map((prediction, index) => (
            <PredictionRow
              key={index}
              homeTeamLogo={`/images/${getEnglishTeamName(prediction.homeTeamIdx)}_big_emb.png`}
              homeTeamName={prediction.homeTeamIdx}
              homeWinPercent={Math.round(prediction.winProbability)}
              awayTeamLogo={`/images/${getEnglishTeamName(prediction.awayTeamIdx)}_big_emb.png`}
              awayTeamName={prediction.awayTeamIdx}
              awayWinPercent={100 - Math.round(prediction.winProbability)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="t-caption-sb mb-1 text-[var(--on-surface-grey2)]">
          최근 경기 결과
        </div>
        {recentResults.map((result, index) => (
          <GameRow
            key={index}
            homeTeamLogo={getTeamLogoByIdx(result.homeTeamIdx)}
            homeTeamName={getTeamNameByIdx(result.homeTeamIdx)}
            homeScore={result.homeScore}
            awayTeamLogo={getTeamLogoByIdx(result.awayTeamIdx)}
            awayTeamName={getTeamNameByIdx(result.awayTeamIdx)}
            awayScore={result.awayScore}
            inning="종료"
          />
        ))}
      </div>
    </div>
  );
}
