import { useState } from "react";

interface Room {
  id: string;
  title: string;
  lastMessage: string;
  avatar: string;
}

interface Message {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
}

export default function MatchingChatListPage() {
  // 예시 데이터
  const rooms: Room[] = [
    { id: "r1", title: "야구 좋아", lastMessage: "20일에 같이 잠실 직관가실 분 한 분 구합니다…!! 티켓있어요", avatar: "/images/default_user.png" },
    { id: "r2", title: "삼성팬", lastMessage: "저 티켓 있습니다!", avatar: "/images/default_user.png" },
    // …더미 방들
  ];
  const [selectedRoom, setSelectedRoom] = useState<Room>(rooms[0]);

  const messages: Message[] = [
    { id: "m1", text: "안녕하세요!!", time: "오후 6:40", isMine: true },
    { id: "m2", text: "네 안녕하세요 ㅎㅎ\n지금 연락 가능합니다!!", time: "", isMine: false },
    { id: "t1", text: " ", time: "(목) 오후 7:40", isMine: false }, // 타임스탬프 표시용
    { id: "m3", text: "20일 잠실 경기 티켓 가지고 있으신 거 맞을까요??", time: "", isMine: true },
    { id: "m4", text: "네 맞아요!! 1루 내야 상단석 2자리 가지고 있습니다\n지금 연락 가능합니다!!", time: "", isMine: false },
    // …더미 메시지
  ];

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8">
      <div className="flex h-[calc(100vh-64px)] bg-white rounded-lg shadow overflow-hidden">
        {/* ─── 왼쪽: 방 목록 ─── */}
        <div className="w-1/3 flex flex-col border-r">
          {/* 목록 헤더 */}
          <div className="px-6 py-4 text-lg font-semibold">목록</div>
          {/* 목록 아이템 */}
          <div className="flex-1 overflow-y-auto">
            {rooms.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedRoom(r)}
                className={`flex items-center px-6 py-4 cursor-pointer hover:bg-gray-100 ${
                  r.id === selectedRoom.id ? "bg-gray-50" : ""
                }`}
              >
                <img
                  src={r.avatar}
                  className="h-10 w-10 rounded-full"
                  alt=""
                />
                <div className="ml-3">
                  <p className="font-medium">{r.title}</p>
                  <p className="text-sm text-gray-500 truncate w-40">
                    {r.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 오른쪽: 채팅창 ─── */}
        <div className="flex flex-col w-2/3">
          {/* 채팅방 헤더 */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedRoom.avatar}
                className="h-10 w-10 rounded-full"
                alt=""
              />
              <div>
                <p className="font-semibold">{selectedRoom.title}</p>
                <p className="text-sm text-gray-500 truncate w-[400px]">
                  {selectedRoom.lastMessage}
                </p>
              </div>
            </div>
            <button className="text-sm text-red-500">차단하기</button>
          </div>

          {/* 메시지 리스트 */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((msg) => (
              msg.id.startsWith("t") ? (
                // 타임스탬프 중앙 정렬
                <div key={msg.id} className="text-center text-xs text-gray-400">
                  {msg.time}
                </div>
              ) : (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`whitespace-pre-wrap max-w-[60%] px-4 py-2 rounded-xl ${
                      msg.isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              )
            ))}
          </div>

          {/* 입력창 */}
          <div className="border-t px-6 py-4">
            <input
              type="text"
              placeholder="메시지 입력..."
              className="w-full rounded-full border px-4 py-2 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}