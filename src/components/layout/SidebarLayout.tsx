import ChatRoom from "../../pages/Chat/ChatRoom";
import ChatRoomList from "../../pages/Chat/ChatRoomList";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useChat } from "../../contexts/ChatContext";

export default function SidebarLayout() {
  const { selectedChatRoom, setSelectedChatRoom, clearSelectedChatRoom } =
    useChat();

  const handleChatRoomSelect = ({
    chatRoomIdx,
    peerIdx,
    peerNickname,
  }: {
    chatRoomIdx: number;
    peerIdx: number;
    peerNickname: string;
  }) => {
    setSelectedChatRoom({
      chatRoomIdx,
      peerIdx,
      peerNickname,
    });
  };

  return (
    <div className="flex h-full w-full">
      <div className="min-w-[880px] flex-1">
        <Outlet />
      </div>
      <div className="w-[400px] flex-shrink-0">
        <Sidebar>
          {selectedChatRoom.chatRoomIdx === null ? (
            <ChatRoomList onSelect={handleChatRoomSelect} />
          ) : (
            <ChatRoom
              idx={selectedChatRoom.chatRoomIdx}
              peerIdx={selectedChatRoom.peerIdx}
              peerNickname={selectedChatRoom.peerNickname}
              onBack={clearSelectedChatRoom}
            />
          )}
        </Sidebar>
      </div>
    </div>
  );
}
