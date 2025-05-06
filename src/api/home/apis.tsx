import axiosInstance from "../axiosInstance";

export const homeApi = {
  getTeamRankings: async () => {
    const response = await axiosInstance.get("/api/teams/rankings");
    return response.data;
  },
};
