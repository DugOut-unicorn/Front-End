import axiosInstance from "../axiosInstance";
import {
  PitcherEraDto,
  PitcherSaveDto,
  PitcherStrikeoutDto,
  PitcherWinRateDto,
  PlayerAVGDto,
  PlayerHitDto,
  PlayerHRDto,
  PlayerRBIDto,
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
      wpct: item.value,
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
      sv: item.value,
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
      so: item.value,
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
      era: item.value,
      playerImageUrl: item.playerImageUrl,
    }));
  },
  getRankPlayerHR: async () => {
    const response = await axiosInstance.get<PlayerHRDto>(
      "/record/personalRank/hitter/HR",
    );
    return response.data.data.map(item => ({
      playerName: item.playerName,
      backNumber: item.backNumber,
      hr: item.value,
      playerImageUrl: item.playerImageUrl,
    }));
  },
  getRankPlayerRBI: async () => {
    const response = await axiosInstance.get<PlayerRBIDto>(
      "/record/personalRank/hitter/rbi",
    );
    return response.data.data.map(item => ({
      playerName: item.playerName,
      backNumber: item.backNumber,
      rbi: item.value,
      playerImageUrl: item.playerImageUrl,
    }));
  },
  getRankPlayerAVG: async () => {
    const response = await axiosInstance.get<PlayerAVGDto>(
      "/record/personalRank/hitter/avg",
    );
    return response.data.data.map(item => ({
      playerName: item.playerName,
      backNumber: item.backNumber,
      avg: item.value,
      playerImageUrl: item.playerImageUrl,
    }));
  },
  getRankPlayerHit: async () => {
    const response = await axiosInstance.get<PlayerHitDto>(
      "/record/personalRank/hitter/H",
    );
    return response.data.data.map(item => ({
      playerName: item.playerName,
      backNumber: item.backNumber,
      hit: item.value,
      playerImageUrl: item.playerImageUrl,
    }));
  },
};
