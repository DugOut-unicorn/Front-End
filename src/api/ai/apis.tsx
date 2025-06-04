import axiosInstance from "../axiosInstance";
import { AIPredictionResponse } from "../../types/ai";

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
};
