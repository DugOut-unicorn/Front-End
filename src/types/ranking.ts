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
