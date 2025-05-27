import axiosInstance from "../axiosInstance";
import { RankingDto } from "../../types/ranking";
import {
  getTeamLogoByIdx,
  getTeamNameByIdx,
} from "../../hooks/TeamNameChanger";

export const rankingApi = {
  getTeamRanking: async () => {
    const response = await axiosInstance.get<RankingDto>("/record/teamRank");

    if (!response.data?.data) {
      throw new Error("Invalid response structure");
    }

    return response.data.data.map((item, index) => ({
      rank: index + 1,
      teamIdx: item.teamIdx,
      teamName: getTeamNameByIdx(item.teamIdx),
      teamLogo: getTeamLogoByIdx(item.teamIdx),
      games: item.game,
      wins: item.win,
      draws: item.draw,
      losses: item.lose,
      winRate: item.winRate,
      gameGap: Number(item.gameGap.toFixed(1)),
      streak: item.streak,
      recentTen: item.recentTen,
    }));
  },
};
