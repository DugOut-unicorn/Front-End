export type rankingDto = {
  teamName: string;
  game: number;
  win: number;
  draw: number;
  lose: number;
};

export type newsDto = {
  title: string;
  url: string;
  imageUrl: string;
};

export type recentMatchingDto = {
  postIdx: number;
  title: string;
  stadiumIdx: number;
  gameIdx: number;
  context: string;
  userNickname: string;
  userCheeringTeamId: string;
  status: number;
  createdAt: string;
  preferredMatchDate: string;
  haveTicket: boolean;
};

export type calendarGameDto = {
  gameIdx: number;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamIdx: number;
  awayTeamIdx: number;
  startTime: string;
  stadiumName: string;
};

export type calendarDayDto = {
  day: number;
  games: calendarGameDto[];
};

export type calendarGamesDetailDto = {
  year: number;
  month: number;
  days: calendarDayDto[];
};

export type StadiumWeatherDto = {
  stadiumId: number;
  stadiumName: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
  condition: string;
};

export type entryBannerDto = {
  cheeringTeamId: number;
  nickname: string;
};

export type recentResultsDto = {
  baseDate: string;
  matchDate: string;
  results: recentResultGameDto[];
};

export type recentResultGameDto = {
  gameIdx: number;
  homeTeamIdx: number;
  awayTeamIdx: number;
  homeScore: number;
  awayScore: number;
  recordedAt: string;
  scheduledAt: string;
};
