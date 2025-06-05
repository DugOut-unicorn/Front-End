import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NickNameInput from "./components/NickNameInput";
import TeamSelection from "./components/TeamSelection";
import Completion from "./components/Complection";

declare global {
  interface Window {
    Kakao: any;
  }
}

interface KakaoUserInfoResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string; // 백엔드가 내려주는 JWT 토큰
    tokenType: string;
    expiresIn: number;
  };
}

const LoginPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 이미 jwtToken이 있으면 id(param)가 undefined인 순수 로그인 화면이 아니라 곧바로 홈으로 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!id && token) {
      window.location.href = "/";
    }
  }, [id]);

  // 카카오 SDK 초기화 (페이지 로드 시 한 번만 수행)
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
    }
  }, []);

  // 회원가입 1단계(닉네임 입력)과 2단계(팀 선택)를 위한 상태
  const [nickname, setNickname] = useState<string>("");
  const [nicknameCheckResult, setNicknameCheckResult] = useState<"available" | "duplicate" | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  // 카카오 로그인 버튼 클릭 시 실행될 함수
  const kakaoLogin = () => {
    if (!window.Kakao) {
      return alert("카카오 SDK가 로드되지 않았습니다.");
    }

    window.Kakao.Auth.login({
      scope: "profile_nickname,account_email",
      throughTalk: false,
      success: async (authObj: any) => {
        try {
          // 1) 카카오 access_token을 백엔드로 전달하여 우리 서버에서 JWT 발급받기
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/kakao/user-info`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken: authObj.access_token }),
            }
          );
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }

          // 2) 백엔드가 내려준 JSON 파싱
          const resp = (await res.json()) as KakaoUserInfoResponse;

          // 3) JWT를 로컬스토리지에 저장
          const jwt = resp.data.accessToken;
          localStorage.setItem("jwtToken", jwt);

          // 4) 가입 여부 조회 (hasSignedIn)
          const hasRes = await fetch(
            `${import.meta.env.VITE_API_URL}/login/hasSignedIn`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          if (!hasRes.ok) {
            throw new Error(`hasSignedIn 호출 실패: ${hasRes.status}`);
          }

          const hasJson = await hasRes.json() as {
            success: boolean;
            message: string;
            data: { hasSignedIn: boolean };
          };

          // 5) 분기 처리
          if (hasJson.data.hasSignedIn) {
            // 이미 가입된 회원: 홈으로 이동
            window.location.href = "/";
          } else {
            // 신규 회원: 닉네임/응원팀 설정 단계로 이동
            navigate("/signup/1");
          }
        } catch (err) {
          console.error("🚨 kakaoLogin 처리 중 에러:", err);
          alert("서버 처리 중 오류가 발생했습니다.");
        }
      },
      fail: (err: any) => {
        console.error("🚨 카카오 로그인 실패:", err);
        alert("카카오 로그인에 실패했습니다.");
      },
    });
  };

  // 회원 가입 단계별 “다음” 버튼 핸들러
  const goStep2 = () => {
    if (nicknameCheckResult === "available") {
      navigate("/signup/2");
    } else {
      alert("닉네임 중복 체크를 완료해주세요!");
    }
  };

  const goStep3 = () => {
    if (selectedTeam) {
      navigate("/signup/3");
    } else {
      alert("응원팀을 선택해주세요!");
    }
  };

  // id 파라미터가 없으면 순수 로그인 화면을 렌더링
  if (!id) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
        <div className="mx-auto w-full max-w-md text-center">
          <p className="mb-1 text-gray-600">야구를 더 가까이, 더 즐겁게</p>
          <h1 className="text-navy-800 mb-8 text-4xl font-extrabold">DUGOUT</h1>

          <div className="mb-6 flex w-full items-center">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="px-4 text-sm text-gray-500">SNS로 간편 로그인</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="w-full space-y-4">
            <button
              onClick={kakaoLogin}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-[#FEE500] shadow transition hover:opacity-90"
            >
              <img
                src="/images/kakao_login.png"
                alt="kakao"
                className="mr-2 h-6 w-6"
              />
              <span className="text-base font-medium text-gray-900">
                카카오톡으로 계속하기
              </span>
            </button>
            <button
              onClick={() => navigate("/signup/1")}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-[#03C75A] shadow transition hover:opacity-90"
            >
              <img
                src="/images/naver_login.png"
                alt="naver"
                className="mr-2 h-6 w-6"
              />
              <span className="text-base font-medium text-white">
                네이버로 계속하기
              </span>
            </button>
            <button
              onClick={() => navigate("/signup/1")}
              className="flex h-12 w-full items-center justify-center rounded-lg border border-gray-200 bg-white shadow transition hover:bg-gray-50"
            >
              <img
                src="/images/google_login.png"
                alt="google"
                className="mr-2 h-6 w-6"
              />
              <span className="text-base font-medium text-gray-800">
                구글로 계속하기
              </span>
            </button>
          </div>

          <p className="mt-6 px-2 text-center text-sm text-gray-500">
            계속 진행 시{" "}
            <button
              onClick={() => window.open("/terms", "_blank")}
              className="underline hover:text-gray-700"
            >
              이용약관
            </button>{" "}
            및{" "}
            <button
              onClick={() => window.open("/privacy", "_blank")}
              className="underline hover:text-gray-700"
            >
              개인정보처리방침
            </button>{" "}
            에 동의한 것으로 간주됩니다.
          </p>
        </div>
      </div>
    );
  }

  // signup 스텝(id === "1", "2", "3")에 따라 각각의 컴포넌트를 렌더링
  switch (id) {
    case "1":
      return (
        <NickNameInput
          nickname={nickname}
          setNickname={setNickname}
          nicknameCheckResult={nicknameCheckResult}
          setNicknameCheckResult={setNicknameCheckResult}
          onNext={goStep2}
        />
      );
    case "2":
      return (
        <TeamSelection
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          onNext={goStep3}   // ← 여기서 goStep3를 넘겨줍니다
        />
      );
    case "3":
      return <Completion onGoToMain={() => (window.location.href = "/")} />;
    default:
      return (
        <div className="flex h-screen items-center justify-center">
          잘못된 경로입니다.
        </div>
      );
  }
};

export default LoginPage;
