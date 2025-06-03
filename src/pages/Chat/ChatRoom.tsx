import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { chatApi } from "../../api/Chat/apis";
import {
  ChatMessageDTO,
  ChatMessageDetailDTO,
  ChatMessagesDTO,
} from "../../types/Chat";
import { chatClient } from "../../hooks/useStompClient";

type ChatRoomProps = {
  idx: number | null;
  peerIdx: number | null;
  peerNickname: string | null;
  peerProfileImageUrl: string | null;
  onBack: () => void;
};

function ChatRoomInner({
  idx,
  peerIdx,
  peerNickname,
  peerProfileImageUrl,
  onBack,
}: {
  idx: number;
  peerIdx: number;
  peerNickname: string;
  peerProfileImageUrl: string;
  onBack: () => void;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageDetailDTO[]>([]);
  const [myId, setMyId] = useState<number | null>(null);
  const [otherUserId, setOtherUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 과거 대화 불러오기
  useEffect(() => {
    if (idx == null) return;
    setLoading(true);

    // 이전 메시지 초기화
    setMessages([]);
    setMyId(null);
    setOtherUserId(null);

    chatApi
      .getChatHistory(idx)
      .then((res: ChatMessagesDTO) => {
        setMessages(res.messages);
        setMyId(res.myId);
        setOtherUserId(peerIdx);
      })
      .catch(() => {
        setError("채팅 기록을 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, [idx, peerIdx]);

  // 토큰 (예: localStorage 또는 AuthContext)
  const token = localStorage.getItem("jwtToken") || "";

  // WebSocket 연결 설정
  useEffect(() => {
    if (!token || myId == null) {
      console.log("[채팅방] 연결 실패: 토큰 또는 myId가 없음", { token, myId });
      return;
    }

    console.log("[채팅방] WebSocket 연결 시도...", { myId });
    // 연결 설정
    chatClient.connect(token);

    // 메시지 핸들러 등록
    const unsubscribe = chatClient.onMessage((msg: ChatMessageDetailDTO) => {
      console.log("[채팅방] 메시지 수신:", msg);
      setMessages(prev => {
        // 중복 메시지 체크
        if (prev.some(m => m.messageIdx === msg.messageIdx)) {
          console.log("[채팅방] 중복 메시지 무시:", msg.messageIdx);
          return prev;
        }
        console.log("[채팅방] 새 메시지 추가:", msg);
        return [...prev, msg];
      });
    });

    // 연결 상태 확인
    const checkConnection = setInterval(() => {
      const isConnected = chatClient.isConnected();
      console.log("[채팅방] WebSocket 연결 상태:", isConnected);
    }, 5000);

    return () => {
      console.log("[채팅방] 정리: 핸들러 제거 및 연결 상태 체크 중단");
      unsubscribe();
      clearInterval(checkConnection);
    };
  }, [token, myId]);

  // 메시지 변경 시 스크롤 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  // 전송 핸들러
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || myId == null || otherUserId == null) {
      console.log("[채팅방] 메시지 전송 실패: 필요한 정보가 없음", {
        hasInput: !!input.trim(),
        myId,
        otherUserId,
      });
      return;
    }

    const messageToSend: ChatMessageDTO = {
      roomIdx: idx,
      senderIdx: myId,
      receiverIdx: otherUserId,
      content: input,
    };

    console.log("[채팅방] 메시지 전송:", messageToSend);

    // 낙관적 업데이트

    setMessages(prev => [...prev]);
    setInput("");

    // 실제 전송
    chatClient.sendMessage(messageToSend);
  };

  if (loading)
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400">
        로딩 중...
      </div>
    );
  if (error)
    return (
      <div className="flex flex-1 items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    <div className="flex h-full w-100 flex-col bg-white">
      {/* 상단 헤더 */}
      <div className="mb-3 flex h-14 items-center justify-between border-b border-[var(--divider-dv2)] px-4">
        <div className="flex items-center gap-2">
          <button className="text-2xl text-gray-400" onClick={onBack}>
            <ChevronLeft />
          </button>
          <img
            src={peerProfileImageUrl}
            alt={peerNickname}
            className="h-8 w-8 rounded-full bg-gray-200 object-cover"
            onError={e => (e.currentTarget.src = "/default-profile.png")}
          />
          <span className="text-base font-bold">{peerNickname}</span>
        </div>
        <button className="rounded-lg border px-3 py-1 text-sm text-gray-700">
          차단하기
        </button>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
        {messages.map((msg, idx) =>
          myId === msg.senderIdx ? (
            <div key={msg.messageIdx} className="flex justify-end">
              <div className="mb-1 max-w-[320px] rounded-2xl bg-black px-4 py-2 text-sm whitespace-pre-line text-white">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={msg.messageIdx} className="flex items-end gap-2">
              {/* 프로필 이미지는 첫 메시지에만 보여주기 */}
              {idx === 0 || messages[idx - 1].senderIdx !== msg.senderIdx ? (
                <img
                  src={peerProfileImageUrl}
                  alt={peerNickname}
                  className="h-6 w-6 rounded-full bg-gray-200 object-cover"
                  onError={e => (e.currentTarget.src = "/default-profile.png")}
                />
              ) : (
                <div style={{ width: 24 }} /> // 빈 공간
              )}
              <div>
                <div className="mb-1 max-w-[320px] rounded-2xl bg-gray-100 px-4 py-2 text-sm whitespace-pre-line text-gray-800">
                  {msg.content}
                </div>
              </div>
            </div>
          ),
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력창 */}
      <form className="flex items-center gap-2 px-4 py-3" onSubmit={handleSend}>
        <input
          className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm outline-none"
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white"
        >
          →
        </button>
      </form>
    </div>
  );
}

export default function ChatRoom({
  idx,
  peerIdx,
  peerNickname,
  peerProfileImageUrl,
  onBack,
}: ChatRoomProps) {
  if (
    idx === null ||
    peerIdx === null ||
    peerNickname === null ||
    peerProfileImageUrl === null
  )
    return null;
  return (
    <ChatRoomInner
      idx={idx}
      peerIdx={peerIdx}
      peerNickname={peerNickname}
      peerProfileImageUrl={peerProfileImageUrl}
      onBack={onBack}
    />
  );
}
