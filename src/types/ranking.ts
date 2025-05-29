export interface TeamRank {
  teamIdx: number;
  game: number;
  win: number;
  draw: number;
  lose: number;
  winRate: number;
  gameGap: number;
  streak: string;
  recentTen: string;
}

export interface RankingDto {
  success: boolean;
  message: string;
  data: TeamRank[];
}

export interface PitcherWinRate {
  playerName: string;
  backNumber: number;
  wpct: number;
  playerImageUrl: string;
}

export interface PitcherWinRateDto {
  success: boolean;
  message: string;
  data: PitcherWinRate[];
}

export interface PitcherSave {
  playerName: string;
  backNumber: number;
  sv: number;
  playerImageUrl: string;
}

export interface PitcherSaveDto {
  success: boolean;
  message: string;
  data: PitcherSave[];
}

export interface PitcherStrikeout {
  playerName: string;
  backNumber: number;
  so: number;
  playerImageUrl: string;
}

export interface PitcherStrikeoutDto {
  success: boolean;
  message: string;
  data: PitcherStrikeout[];
}

export interface PitcherEra {
  playerName: string;
  backNumber: number;
  era: number;
  playerImageUrl: string;
}

export interface PitcherEraDto {
  success: boolean;
  message: string;
  data: PitcherEra[];
}
