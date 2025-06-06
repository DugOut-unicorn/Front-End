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

export interface PitcherRanking<T> {
  playerName: string;
  backNumber: number;
  playerImageUrl: string;
  value: T;
}

export interface PitcherRankingDto<T> {
  success: boolean;
  message: string;
  data: PitcherRanking<T>[];
}

// 타입 별칭 정의
export type PitcherWinRate = PitcherRanking<number>;
export type PitcherWinRateDto = PitcherRankingDto<number>;

export type PitcherSave = PitcherRanking<number>;
export type PitcherSaveDto = PitcherRankingDto<number>;

export type PitcherStrikeout = PitcherRanking<number>;
export type PitcherStrikeoutDto = PitcherRankingDto<number>;

export type PitcherEra = PitcherRanking<number>;
export type PitcherEraDto = PitcherRankingDto<number>;

// 타자 랭킹 관련 인터페이스
export interface PlayerRanking<T> {
  playerName: string;
  backNumber: number;
  playerIdx: number;
  playerImageUrl: string;
  value: T;
}

export interface PlayerRankingDto<T> {
  success: boolean;
  message: string;
  data: PlayerRanking<T>[];
}

// 타자 랭킹 타입 별칭
export type PlayerHR = PlayerRanking<number>;
export type PlayerHRDto = PlayerRankingDto<number>;

export type PlayerRBI = PlayerRanking<number>;
export type PlayerRBIDto = PlayerRankingDto<number>;

export type PlayerAVG = PlayerRanking<number>;
export type PlayerAVGDto = PlayerRankingDto<number>;

export type PlayerHit = PlayerRanking<number>;
export type PlayerHitDto = PlayerRankingDto<number>;
