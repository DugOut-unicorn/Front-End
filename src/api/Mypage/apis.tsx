import axiosInstance from "../axiosInstance";

export const mypageApi = {
  getMyTemp: async () => {
    const { data } = await axiosInstance.get("/mypage/myTemp");
    return data;
  },
  getMyProfile: async () => {
    const { data } = await axiosInstance.get("/mypage/myProfile");
    return data;
  },
};
