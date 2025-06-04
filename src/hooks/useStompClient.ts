import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ChatMessageDetailDTO } from "../types/Chat";
import { useEffect } from "react";

// 전송용 메시지 타입
interface SendMessageDTO {
  roomIdx: number;
  senderIdx: number;
  receiverIdx: number;
  content: string;
}

class ChatClient {
  private static instance: ChatClient;
  private client: Client | null = null;
  private messageHandlers: ((msg: ChatMessageDetailDTO) => void)[] = [];

  private constructor() {}

  static getInstance(): ChatClient {
    if (!ChatClient.instance) {
      ChatClient.instance = new ChatClient();
    }
    return ChatClient.instance;
  }

  connect(token: string) {
    if (this.client?.active) {
      console.log("[STOMP] 이미 연결되어 있습니다.");
      return;
    }

    // 이전 연결 정리
    this.disconnect();

    // 새 연결 설정
    this.client = new Client({
      // Handshake 시 쿼리 파라미터로 토큰 전달
      webSocketFactory: () =>
        new SockJS(
          `https://dev.dug-out.store/ws-chat?token=${encodeURIComponent(token)}`,
        ),
      debug: str => console.log("[STOMP]", str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log("[STOMP] WebSocket 연결 성공");

        // 메시지 구독: userDestinationPrefix를 포함한 올바른 경로
        this.client?.subscribe("/user/queue/messages", (frame: IMessage) => {
          try {
            const msg: ChatMessageDetailDTO = JSON.parse(frame.body);
            console.log("[STOMP] 메시지 수신:", msg);
            this.messageHandlers.forEach(handler => handler(msg));
          } catch (e) {
            console.error("[STOMP] 파싱 오류:", e);
          }
        });
      },
      onStompError: frame => {
        console.error("[STOMP] 에러:", frame.headers["message"], frame.body);
      },
      onWebSocketClose: () => {
        console.warn("[STOMP] 연결 종료");
      },
    });

    this.client.activate();
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
  }

  // 메시지 핸들러 등록
  onMessage(handler: (msg: ChatMessageDetailDTO) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  // 메시지 전송
  sendMessage(msg: SendMessageDTO) {
    if (!this.client?.active) {
      console.error("[STOMP] 전송 실패: 연결이 없습니다.");
      return;
    }
    console.log("[STOMP] 메시지 전송:", msg);
    this.client.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(msg),
    });
  }

  isConnected(): boolean {
    return this.client?.active ?? false;
  }
}

// 싱글톤 인스턴스 export
export const chatClient = ChatClient.getInstance();

// 기존 훅은 하위 호환성을 위해 유지
export function useStompClient(
  options: {
    onMessage?: (msg: ChatMessageDetailDTO) => void;
    token?: string;
    reconnectDelay?: number;
  } | null,
) {
  const { onMessage = () => {}, token } = options || {};

  useEffect(() => {
    if (!token) {
      console.warn("[STOMP] 연결 정보가 없습니다.");
      return;
    }

    chatClient.connect(token);
    const unsubscribe = chatClient.onMessage(onMessage);

    return () => {
      unsubscribe();
      // 컴포넌트 언마운트 시 연결 유지 (다른 컴포넌트가 사용 중일 수 있으므로)
    };
  }, [token, onMessage]);

  return {
    connected: chatClient.isConnected(),
    sendMessage: chatClient.sendMessage.bind(chatClient),
  };
}
