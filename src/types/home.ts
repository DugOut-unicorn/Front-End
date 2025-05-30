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
};

export type calendarGameDto = {
  gameIdx: number;
  homeTeamName: string;
  awayTeamName: string;
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

export type cheeringTeamDto = {
  cheeringTeamIdx: number;
};
