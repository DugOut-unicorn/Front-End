import { useState } from "react";
import ChatRoom from "../../pages/Chat/ChatRoom";
import ChatRoomList from "../../pages/Chat/ChatRoomList";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function SidebarLayout() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [selectedPeerIdx, setSelectedPeerIdx] = useState<number | null>(null);
  const [selectedPeerNickname, setSelectedPeerNickname] = useState<
    string | null
  >(null);

  const handleChatRoomSelect = ({
    chatRoomIdx,
    peerIdx,
    peerNickname,
  }: {
    chatRoomIdx: number;
    peerIdx: number;
    peerNickname: string;
  }) => {
    setSelectedIdx(chatRoomIdx);
    setSelectedPeerIdx(peerIdx);
    setSelectedPeerNickname(peerNickname);
  };

  return (
    <div className="flex h-full w-full">
      <div className="min-w-[880px] flex-1">
        <Outlet />
      </div>
      <div className="w-[400px] flex-shrink-0">
        <Sidebar>
          {selectedIdx === null ? (
            <ChatRoomList onSelect={handleChatRoomSelect} />
          ) : (
            <ChatRoom
              idx={selectedIdx}
              peerIdx={selectedPeerIdx}
              peerNickname={selectedPeerNickname}
              onBack={() => {
                setSelectedIdx(null);
                setSelectedPeerIdx(null);
                setSelectedPeerNickname(null);
              }}
            />
          )}
        </Sidebar>
      </div>
    </div>
  );
}
