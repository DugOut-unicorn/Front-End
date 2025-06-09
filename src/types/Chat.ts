export interface ChatMessage {
  roomIdx: number;
  senderIdx: number;
  receiverIdx: number;
  content: string;
}

export interface ChatRoomDTO {
  chatRoomIdx: number;
  peerIdx: number;
  peerNickname: string;
  peerProfileImageUrl: string;
  createdAt: string;
  matchingPostIdx: number;
}

export interface ChatMessagesDTO {
  myId: number;
  messages: ChatMessageDetailDTO[];
}

// 전송용 메시지 DTO (서버의 ChatMessageDto와 일치)
export interface ChatMessageDTO {
  roomIdx: number;
  senderIdx: number;
  receiverIdx: number;
  content: string;
}

// 서버 응답 DTO (서버의 ChatMessageResponse와 일치)
export interface ChatMessageDetailDTO {
  messageIdx: number;
  chatRoomIdx: number;
  senderIdx: number;
  receiverIdx: number;
  content: string;
  sentAt: string;
}

// 채팅방 생성 요청 DTO
export interface ChatRoomCreateRequestDTO {
  matchingPostId: number;
}

// 채팅방 생성 응답 DTO
export interface ChatRoomResponseDTO {
  data(data: any): unknown;
  chatRoomId: number;
  withUserId: number;
}
