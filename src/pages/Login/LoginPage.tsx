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
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    id?: number;
    has_signed_up?: boolean;
    properties?: { nickname: string };
  };
}

const LoginPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 이미 jwtToken이 있으면 /login(id === undefined)이 아니라 바로 홈으로
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!id && token) {
      navigate("/");
    }
  }, [id, navigate]);

  // 카카오 SDK 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
    }
  }, []);

  const [nickname, setNickname] = useState<string>("");
  const [nicknameCheckResult, setNicknameCheckResult] = useState<
    "available" | "duplicate" | null
  >(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const kakaoLogin = () => {
    if (!window.Kakao) {
      return alert("카카오 SDK가 로드되지 않았습니다.");
    }

    window.Kakao.Auth.login({
      scope: "profile_nickname,account_email",
      throughTalk: false,
      success: async (authObj: any) => {
        try {
          // 1) 카카오 accessToken으로 백엔드 로그인
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/kakao/user-info`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken: authObj.access_token }),
            },
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const resp = (await res.json()) as KakaoUserInfoResponse;

          // 2) JWT 저장
          const jwt = resp.data.accessToken;
          localStorage.setItem("jwtToken", jwt);
          if (resp.data.id !== undefined) {
            localStorage.setItem("userIdx", String(resp.data.id));
          }

          // 3) 가입 여부 조회 (/login/hasSignedIn)
          const hasRes = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/login/hasSignedIn`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            },
          );
          if (!hasRes.ok)
            throw new Error(`hasSignedIn 호출 실패: ${hasRes.status}`);
          const hasJson = (await hasRes.json()) as {
            success: boolean;
            message: string;
            data: { hasSignedIn: boolean };
          };

          // 4) 분기 처리
          if (hasJson.data.hasSignedIn) {
            // 이미 모두 완료된 회원: 홈으로
            navigate("/");
          } else {
            // 닉네임/응원팀 설정 필요
            if (resp.data.properties?.nickname) {
              setNickname(resp.data.properties.nickname);
            }
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

  const goStep2 = () => {
    if (nicknameCheckResult === "available") navigate("/signup/2");
    else alert("닉네임 중복 체크를 완료해주세요!");
  };

  const goStep3 = () => {
    if (selectedTeam) navigate("/signup/3");
    else alert("응원팀을 선택해주세요!");
  };

  // id 파라미터 없으면 순수 로그인 화면
  if (!id) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
        <div className="mx-auto w-full max-w-md text-center">
          <p className="mb-1 text-gray-600">야구를 더 가까이, 더 즐겁게</p>
          <h1 className="text-navy-800 mb-8 text-4xl font-extrabold">DUGOUT</h1>
          <div className="mb-6 flex w-full items-center">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="px-4 text-sm text-gray-500">
              SNS로 간편 로그인
            </span>
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

  // signup 스텝별 렌더링
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
          onNext={goStep3}
        />
      );
    case "3":
      return <Completion onGoToMain={() => navigate("/")} />;
    default:
      return (
        <div className="flex h-screen items-center justify-center">
          잘못된 경로입니다.
        </div>
      );
  }
};

export default LoginPage;
