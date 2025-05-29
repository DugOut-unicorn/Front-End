import axiosInstance from "../axiosInstance";
import {
  PitcherEraDto,
  PitcherSaveDto,
  PitcherStrikeoutDto,
  PitcherWinRateDto,
  RankingDto,
} from "../../types/ranking";
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
  getRankPitcherWinRate: async () => {
    const response = await axiosInstance.get<PitcherWinRateDto>(
      "/record/personalRank/pitcher/winRate",
    );
    return response.data.data.map(item => ({
      playerName: item.playerName,
      backNumber: item.backNumber,
      wpct: item.wpct,
      playerImageUrl: item.playerImageUrl,
    }));
  },
  getRankPitcherSv: async () => {
    const response = await axiosInstance.get<PitcherSaveDto>(
      "/record/personalRank/pitcher/sv",
    );
    return response.data.data.map(item => ({
      playerName: item.playerName,
      backNumber: item.backNumber,
      sv: item.sv,
      playerImageUrl: item.playerImageUrl,
    }));
  },
  getRankPitcherSo: async () => {
    const response = await axiosInstance.get<PitcherStrikeoutDto>(
      "/record/personalRank/pitcher/so",
    );
    return response.data.data.map(item => ({
      playerName: item.playerName,
      backNumber: item.backNumber,
      so: item.so,
      playerImageUrl: item.playerImageUrl,
    }));
  },
  getRankPitcherEra: async () => {
    const response = await axiosInstance.get<PitcherEraDto>(
      "/record/personalRank/pitcher/era",
    );
    return response.data.data.map(item => ({
      playerName: item.playerName,
      backNumber: item.backNumber,
      era: item.era,
      playerImageUrl: item.playerImageUrl,
    }));
  },
};
