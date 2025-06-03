import {
  ChatMessagesDTO,
  ChatRoomDTO,
  ChatRoomCreateRequestDTO,
  ChatRoomResponseDTO,
} from "../../types/Chat";
import axiosInstance from "../axiosInstance";

export const chatApi = {
  getChatRooms: async () => {
    const { data: raw } =
      await axiosInstance.get<ChatRoomDTO[]>("/api/chat/rooms");
    return raw.map((item: any) => ({
      chatRoomIdx: item.chatRoomIdx,
      peerIdx: item.peerIdx,
      peerNickname: item.peerNickname,
      peerProfileImageUrl: item.peerProfileImageUrl,
      createdAt: item.createdAt,
    }));
  },

  getChatRoomDetail: async (chatRoomIdx: number) => {
    const { data } = await axiosInstance.get<ChatRoomDTO>(
      `/api/chat/rooms/${chatRoomIdx}`,
    );
    return data;
  },

  getChatHistory: async (chatRoomIdx: number) => {
    const { data } = await axiosInstance.get<ChatMessagesDTO>(
      `/api/chat/history?roomId=${chatRoomIdx}`,
    );
    return data;
  },
  postMakeChatRoom: async (matchingPostIdx: number) => {
    const { data } = await axiosInstance.post<ChatRoomResponseDTO>(
      `/api/chat`,
      { matchingPostId: matchingPostIdx } as ChatRoomCreateRequestDTO,
    );
    return data;
  },
};
