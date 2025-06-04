import { useChat } from "../../contexts/ChatContext";

export default function ChatRoomList({
  onSelect,
}: {
  onSelect: (params: {
    chatRoomIdx: number;
    peerIdx: number;
    peerNickname: string;
  }) => void;
}) {
  const { chatRooms } = useChat();

  return (
    <div className="h-[calc(100vh-4rem)] w-100 bg-[var(--surface-1)]">
      <div className="flex h-14 items-center border-b border-[var(--divider-dv2)] bg-[var(--surface-1)]">
        <h3 className="t-h3 mx-4 text-[var(--on-surface-default)]">채팅</h3>
      </div>
      <div className="flex flex-col divide-y divide-[var(--divider-dv2)] bg-[var(--surface-1)]">
        {chatRooms.map(room => (
          <div
            key={room.chatRoomIdx}
            className="flex cursor-pointer items-center px-5 py-4 hover:bg-gray-100"
            onClick={() =>
              onSelect({
                chatRoomIdx: room.chatRoomIdx,
                peerIdx: room.peerIdx,
                peerNickname: room.peerNickname,
              })
            }
          >
            {/* 프로필 이미지 */}
            <img
              src={room.peerProfileImageUrl || "/images/default-profile.png"}
              alt={room.peerNickname}
              className="mr-4 h-12 w-12 flex-shrink-0 rounded-full bg-gray-200 object-cover"
              onError={e =>
                (e.currentTarget.src = "/images/default-profile.png")
              }
            />
            {/* 닉네임, 생성일시 */}
            <div className="flex w-75 min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-row justify-between">
                <div className="truncate text-xs font-bold">
                  {room.peerNickname}
                </div>
                <div className="text-xs whitespace-nowrap text-gray-500">
                  {new Date(room.createdAt).toLocaleString("ko-KR", {
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              {/* 최근 메시지/안읽음 뱃지는 필요시 추가 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
