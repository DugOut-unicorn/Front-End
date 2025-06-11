import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { chatApi } from "../../api/Chat/apis";
import { useChat } from "../../contexts/ChatContext";

interface MatchingPostDetailResponse {
  matchingPostIdx: number;
  userIdx: number;
  authorNickname: string;
  title: string;
  context: string;
  haveTicket: boolean;
  createdAt: string;
}

export default function ArticleDetail() {
  const { postIdx } = useParams<{ postIdx: string }>();
  const navigate = useNavigate();
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const { setSelectedChatRoom } = useChat();

  // 1) API 응답을 담을 상태
  const [post, setPost] = useState<MatchingPostDetailResponse | null>(null);
  // 2) 로딩 / 에러 상태
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // 3) "로그인 모달"을 보여줄지 여부
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    // -- ① 로그인 여부 검사 (localStorage에 저장된 JWT가 있는지 확인) --
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      // JWT가 없으면 상세 페이지로 접근 불가 → 모달 띄우기
      setErrorMsg("로그인이 필요한 페이지입니다.");
      setLoading(false);
      setShowLoginModal(true);
      return;
    }

    // -- ② postIdx가 URL 파라미터로 넘어오지 않은 경우 --
    if (!postIdx) {
      setErrorMsg("잘못된 접근입니다.");
      setLoading(false);
      return;
    }

    // -- ③ 상세 데이터 호출 함수 --
    const fetchDetail = async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        const resp = await axios.get<MatchingPostDetailResponse>(
          `/matching-post/${postIdx}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setPost(resp.data);
      } catch (err: any) {
        console.error("매칭글 상세 조회 실패:", err);

        if (err.response && err.response.status === 404) {
          setErrorMsg("해당 글을 찾을 수 없습니다.");
        } else if (err.response && err.response.status === 401) {
          setErrorMsg(
            "로그인 정보가 만료되었거나 권한이 없습니다. 다시 로그인하세요.",
          );
        } else {
          setErrorMsg("서버 오류가 발생했습니다. 잠시 후 다시 시도하세요.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [postIdx]);

  const handleCreateChat = async () => {
    if (!post) return;

    try {
      setIsCreatingChat(true);
      const response = await chatApi.postMakeChatRoom(post.matchingPostIdx);

      // 채팅방 생성 성공 시 사이드바의 채팅방을 선택
      setSelectedChatRoom({
        chatRoomIdx: response.chatRoomId,
        peerIdx: response.withUserId,
        peerNickname: post.authorNickname,
      });
    } catch (error: any) {
      console.error("채팅방 생성 실패:", error);
      if (error.response?.status === 409) {
        alert("이미 존재하는 채팅방입니다.");
      } else {
        alert("채팅방 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setIsCreatingChat(false);
    }
  };

  // -- 로딩 중 표시 --
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        로딩 중...
      </div>
    );
  }

  // -- "로그인 모달"이 보여지는 상태일 때 --
  if (showLoginModal) {
    return (
      // ▶ 오버레이 백그라운드
      <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
        {/* ▶ 모달 박스 */}
        <div className="w-[300px] rounded-lg bg-white p-6 text-center shadow-lg">
          <p className="mb-6 text-base text-gray-800">
            로그인 후 계속 이용하실 수 있어요.
          </p>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="w-full rounded border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
          >
            로그인 / 회원가입
          </button>
        </div>
      </div>
    );
  }

  // -- 에러 상태가 있을 때 (404 등) --
  if (errorMsg) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-red-500">
        <p className="mb-4">{errorMsg}</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
        >
          뒤로가기
        </button>
      </div>
    );
  }

  // -- post 데이터가 정상적으로 들어오지 않은 경우(null) --
  if (!post) {
    return null;
  }

  // -- 정상적으로 post를 불러온 경우 본문 렌더링 --
  return (
    <div className="relative mx-auto max-w-2xl space-y-6 px-4 py-8">
      {/* 뒤로가기 화살표 */}
      <button
        onClick={() => navigate(-1)}
        className="mb-2 flex items-center text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft size={20} className="mr-1" />
        <span className="text-sm">뒤로</span>
      </button>

      {/* 제목 */}
      <div className="mb-2 border-t pt-4">
        <h1 className="text-xl font-bold">{post.title}</h1>
      </div>

      {/* 메타 정보 */}
      <div className="flex items-start justify-between text-sm text-gray-500">
        <div className="space-y-1">
          <div>
            작성자:{" "}
            <span className="font-medium text-gray-800">
              {post.authorNickname}
            </span>
          </div>
          <div>
            작성일:{" "}
            <span className="font-medium text-gray-800">
              {new Date(post.createdAt).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div>
            티켓 보유:{" "}
            {post.haveTicket ? (
              <span className="font-medium text-green-600">O</span>
            ) : (
              <span className="font-medium text-red-600">X</span>
            )}
          </div>
        </div>

      </div>

      {/* 본문 */}
      <div className="rounded-lg border border-gray-300 bg-white p-4 text-sm whitespace-pre-line">
        {post.context}
      </div>

      {/* 채팅하기 버튼 */}
      <div className="mt-2 text-right">
        <button
          onClick={handleCreateChat}
          disabled={isCreatingChat}
          className={`rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 ${
            isCreatingChat ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isCreatingChat ? "채팅방 생성 중..." : "채팅하기"}
        </button>
      </div>

    </div>
  );
}
