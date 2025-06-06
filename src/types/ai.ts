export interface AIPredictionDTO {
  homeTeamIdx: string;
  awayTeamIdx: string;
  winProbability: number;
}

export type AIPredictionResponse = AIPredictionDTO[];

export interface TeamRankDTO {
  id: number;
  teamName: string;
  rank: number;
  currentRank: number;
}

export type FinalRankingResponse = TeamRankDTO[];

export interface GamePredictionDTO {
  gameId: string;
  awayTeam: string;
  homeTeam: string;
  inning: number;
  winProbability: number;
  homeAccumScore: number;
  awayAccumScore: number;
  predictedAt: string;
}

export type GamePredictionResponse = GamePredictionDTO[];
