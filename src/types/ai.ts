export interface AIPredictionDTO {
  homeTeamIdx: string;
  awayTeamIdx: string;
  winProbability: number;
}

export type AIPredictionResponse = AIPredictionDTO[];
