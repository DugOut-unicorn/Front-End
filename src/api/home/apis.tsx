import {
  calendarGamesDetailDto,
  entryBannerDto,
  newsDto,
  rankingDto,
  recentMatchingDto,
  recentResultsDto,
  StadiumWeatherDto,
} from "../../types/home";
import axiosInstance from "../axiosInstance";

export const homeApi = {
  getEntryBanner: async () => {
    const { data: raw } =
      await axiosInstance.get<entryBannerDto>("/home/entry-banner");
    return [
      {
        cheeringTeamId: raw.cheeringTeamId,
        nickname: raw.nickname,
      },
    ];
  },
  getNewsFetch: async () => {
    const { data: raw } =
      await axiosInstance.get<newsDto[]>("/home/news-fetch");
    return raw.map((item: any) => ({
      title: item.title,
      url: item.url,
      imageUrl: item.imageSrc,
    }));
  },
  getOngoingGames: async () => {
    const response = await axiosInstance.get("/home/ongoing-games");
    return response.data;
  },
  getTeamRanking: async () => {
    const { data: raw } =
      await axiosInstance.get<rankingDto[]>("/home/ranking");
    return raw.map((item, index) => ({
      id: String(index + 1),
      logo: getEnglishTeamName(item.teamName),
      name: item.teamName,
      games: item.game,
      wins: item.win,
      draws: item.draw,
      losses: item.lose,
    }));
  },
  getRecentMatchingPosts: async () => {
    const { data: raw } = await axiosInstance.get<recentMatchingDto[]>(
      "/home/recent-matching-posts",
    );
    return raw.map(item => ({
      postIdx: item.postIdx,
      title: item.title,
      stadiumIdx: item.stadiumIdx,
      gameIdx: item.gameIdx,
      context: item.context,
      userNickname: item.userNickname,
      userCheeringTeamId: item.userCheeringTeamId,
      status: item.status,
      createdAt: item.createdAt,
      preferredMatchDate: item.preferredMatchDate,
      haveTicket: item.haveTicket,
    }));
  },

  getCalendarGames: async (
    year: number,
    month: number,
    day?: number,
    cheeringTeamIdx?: number,
  ) => {
    const queryParams = new URLSearchParams({
      month: `${year}-${String(month).padStart(2, "0")}`,
    });

    if (day !== undefined) {
      queryParams.append("day", String(day));
    }
    if (cheeringTeamIdx !== undefined) {
      queryParams.append("cheeringTeamIdx", String(cheeringTeamIdx));
    }

    const { data: raw } = await axiosInstance.get<calendarGamesDetailDto>(
      `/home/calendar-games?${queryParams.toString()}`,
    );

    return {
      year: raw.year,
      month: raw.month,
      days: raw.days.map(day => ({
        day: day.day,
        games: day.games.map(game => ({
          ...game,
          startTime: `${String(game.startTime).padStart(4, "0").slice(0, 2)}:${String(game.startTime).padStart(4, "0").slice(2)}`,
          stadiumName: game.stadiumName,
        })),
      })),
    };
  },

  getStadiumWeathers: async () => {
    const { data: raw } = await axiosInstance.get<StadiumWeatherDto[]>(
      "/home/stadium-weathers",
    );
    return raw.map(item => ({
      stadiumId: item.stadiumId,
      stadiumName: item.stadiumName,
      temperature: item.temperature,
      humidity: item.humidity,
      precipitation: item.precipitation,
      windSpeed: item.windSpeed,
      windDirection: item.windDirection,
      condition: item.condition,
    }));
  },
  getRecentResults: async (date?: string, limit: number = 5) => {
    const queryParams = new URLSearchParams();

    if (date) {
      queryParams.append("date", date);
    }
    queryParams.append("limit", String(limit));

    const { data: raw } = await axiosInstance.get<recentResultsDto>(
      `/home/recent-results?${queryParams.toString()}`,
    );
    return {
      baseDate: raw.baseDate,
      matchDate: raw.matchDate,
      results: raw.results.map(result => ({
        gameIdx: result.gameIdx,
        homeTeamIdx: result.homeTeamIdx,
        awayTeamIdx: result.awayTeamIdx,
        homeScore: result.homeScore,
        awayScore: result.awayScore,
        recordedAt: result.recordedAt,
        scheduledAt: result.scheduledAt,
      })),
    };
  },
};

const teamNameMap: { [key: string]: string } = {
  LG: "lg",
  SSG: "ssg",
  삼성: "samsung",
  NC: "nc",
  두산: "doosan",
  KT: "kt",
  롯데: "lotte",
  키움: "kiwoom",
  KIA: "kia",
  한화: "hanwha",
};

export function getEnglishTeamName(koreanName: string): string {
  const mappedName = teamNameMap[koreanName];
  if (!mappedName) {
    console.warn(`팀 이름 매핑을 찾을 수 없습니다: ${koreanName}`);
    return koreanName.toLowerCase();
  }
  return mappedName;
}
