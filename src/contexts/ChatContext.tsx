import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { chatApi } from "../api/Chat/apis";
import { ChatRoomDTO } from "../types/Chat";

interface ChatContextType {
  selectedChatRoom: {
    chatRoomIdx: number | null;
    peerIdx: number | null;
    peerNickname: string | null;
  };
  chatRooms: ChatRoomDTO[];
  setSelectedChatRoom: (room: {
    chatRoomIdx: number;
    peerIdx: number;
    peerNickname: string;
  }) => void;
  clearSelectedChatRoom: () => void;
  refreshChatRooms: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [selectedChatRoom, setSelectedChatRoomState] = useState<{
    chatRoomIdx: number | null;
    peerIdx: number | null;
    peerNickname: string | null;
  }>({
    chatRoomIdx: null,
    peerIdx: null,
    peerNickname: null,
  });

  const [chatRooms, setChatRooms] = useState<ChatRoomDTO[]>([]);

  const refreshChatRooms = useCallback(async () => {
    try {
      const rooms = await chatApi.getChatRooms();
      setChatRooms(rooms);
    } catch (error) {
      console.error("채팅방 목록을 불러오지 못했습니다:", error);
    }
  }, []);

  // 초기 채팅방 목록 로드
  useEffect(() => {
    refreshChatRooms();
  }, [refreshChatRooms]);

  const setSelectedChatRoom = useCallback(
    (room: { chatRoomIdx: number; peerIdx: number; peerNickname: string }) => {
      setSelectedChatRoomState(room);
    },
    [],
  );

  const clearSelectedChatRoom = useCallback(() => {
    setSelectedChatRoomState({
      chatRoomIdx: null,
      peerIdx: null,
      peerNickname: null,
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChatRoom,
        chatRooms,
        setSelectedChatRoom,
        clearSelectedChatRoom,
        refreshChatRooms,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
