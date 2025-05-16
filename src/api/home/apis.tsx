import { newsDto, rankingDto, recentMatchingDto } from "../../types/home";
import axiosInstance from "../axiosInstance";

export const homeApi = {
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
    }));
  },
  getRecentResults: async () => {
    const response = await axiosInstance.get("/home/recent-results");
    return response.data;
  },
  getStadiumWeathers: async () => {
    const response = await axiosInstance.get("/home/stadium-weathers");
    return response.data;
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

function getEnglishTeamName(koreanName: string): string {
  const mappedName = teamNameMap[koreanName];
  if (!mappedName) {
    console.warn(`팀 이름 매핑을 찾을 수 없습니다: ${koreanName}`);
    return koreanName.toLowerCase();
  }
  return mappedName;
}
