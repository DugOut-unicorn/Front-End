import axiosInstance from "../axiosInstance";
import {
  AIPredictionResponse,
  FinalRankingResponse,
  GamePredictionResponse,
} from "../../types/ai";

export const aiApi = {
  getWinProbability: async (date: string): Promise<AIPredictionResponse> => {
    const { data: raw } = await axiosInstance.get<AIPredictionResponse>(
      `/api/win-rates?date=${date}`,
    );
    return raw.map((item: any) => ({
      homeTeamIdx: item.homeTeamIdx,
      awayTeamIdx: item.awayTeamIdx,
      winProbability: item.winProbability,
    }));
  },
  getFinalRank: async (): Promise<FinalRankingResponse> => {
    const { data: raw } =
      await axiosInstance.get<FinalRankingResponse>("/final-rankings");
    return raw.map((item: any) => ({
      id: item.id,
      teamName: item.teamName,
      rank: item.rank,
      currentRank: item.currentRank,
    }));
  },
  getGamePrediction: async (): Promise<GamePredictionResponse> => {
    const { data: raw } = await axiosInstance.get<GamePredictionResponse>(
      "/api/win-rates/live-prediction",
    );
    return raw.map((item: any) => ({
      gameId: item.gameId,
      awayTeam: item.awayTeam,
      homeTeam: item.homeTeam,
      inning: item.inning,
      winProbability: item.winProbability,
      homeAccumScore: item.homeAccumScore,
      awayAccumScore: item.awayAccumScore,
      predictedAt: item.predictedAt,
    }));
  },
};
