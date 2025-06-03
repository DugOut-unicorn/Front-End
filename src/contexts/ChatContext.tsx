import React, { createContext, useContext, useState, useCallback } from "react";

interface ChatContextType {
  selectedChatRoom: {
    chatRoomIdx: number | null;
    peerIdx: number | null;
    peerNickname: string | null;
    peerProfileImageUrl: string | null;
  };
  setSelectedChatRoom: (room: {
    chatRoomIdx: number;
    peerIdx: number;
    peerNickname: string;
    peerProfileImageUrl: string;
  }) => void;
  clearSelectedChatRoom: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [selectedChatRoom, setSelectedChatRoomState] = useState<{
    chatRoomIdx: number | null;
    peerIdx: number | null;
    peerNickname: string | null;
    peerProfileImageUrl: string | null;
  }>({
    chatRoomIdx: null,
    peerIdx: null,
    peerNickname: null,
    peerProfileImageUrl: null,
  });

  const setSelectedChatRoom = useCallback(
    (room: {
      chatRoomIdx: number;
      peerIdx: number;
      peerNickname: string;
      peerProfileImageUrl: string;
    }) => {
      setSelectedChatRoomState(room);
    },
    [],
  );

  const clearSelectedChatRoom = useCallback(() => {
    setSelectedChatRoomState({
      chatRoomIdx: null,
      peerIdx: null,
      peerNickname: null,
      peerProfileImageUrl: null,
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChatRoom,
        setSelectedChatRoom,
        clearSelectedChatRoom,
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
