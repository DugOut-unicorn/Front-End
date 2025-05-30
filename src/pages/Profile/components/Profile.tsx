// src/pages/Profile/components/Profile.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  userIdx: number;
  nickname: string;
  cheeringTeamId: number;
  bio: string;
  profileImageUrl: string;
  userTemp: number;
}

const dummyPosts = [
  {
    id: 1,
    text: "20일에 같이 잠실 직관가실 분들 구합니다..!! 티켓있어요",
    date: "25.02.23",
  },
  {
    id: 2,
    text: "20일에 같이 잠실 직관가실 분들 구합니다..!! 티켓있어요",
    date: "25.02.23",
  },
  {
    id: 3,
    text: "20일에 같이 잠실 직관가실 분들 구합니다..!! 티켓있어요",
    date: "25.02.23",
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [cheeringTeamId, setCheeringTeamId] = useState<number | null>(null);
  const [bio, setBio] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [userTemp, setUserTemp] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // JWT 또는 AccessToken 읽기
        const token = localStorage.getItem("jwtToken");
        console.log("Fetch token:", token);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/mypage/myTemp`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data: ProfileData = await res.json();
        setNickname(data.nickname);
        setCheeringTeamId(data.cheeringTeamId);
        setBio(data.bio);
        setProfileImageUrl(data.profileImageUrl);
        setUserTemp(data.userTemp);
      } catch (err: any) {
        console.error("프로필 불러오기 실패:", err);
      }
    })();
  }, []);

  const teamNameMap: Record<number, string> = {
    1: "LG 트윈스",
    2: "SSG 랜더스",
    3: "삼성 라이온즈",
    4: "KT위즈",
    5: "롯데 자이언츠",
    6: "NC 다이노스",
    7: "두산 베어스",
    8: "키움 히어로즈",
    9: "KIA 타이거즈",
    10: "한화 이글스",
  };
  const cheeringTeamName =
    cheeringTeamId !== null
      ? teamNameMap[cheeringTeamId] || "미지정"
      : "로딩 중";

  return (
    <>
      {/* 헤더 배너 */}
      <section
        className="relative mb-8 h-48 w-full bg-blue-900"
        style={{
          backgroundImage: "url('/images/banner_bg.png')",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-opacity-75 absolute inset-0 bg-blue-900" />
        <div className="relative flex h-full items-start px-8 pt-6">
          {/* 프로필 + 소개 */}
          <div className="flex items-start space-x-6">
            <img
              src={profileImageUrl || "/images/user_avatar.png"}
              alt="프로필"
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />
            <div className="text-white">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">
                  {nickname || "로딩 중..."}
                </h1>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-blue-900">
                  {cheeringTeamName}
                </span>
              </div>
              <p className="mt-1 text-sm">{bio || "자기소개가 없습니다."}</p>
              {/* 수정/설정 버튼 */}
              <div className="mt-3 flex items-center space-x-3">
                <button
                  onClick={() => navigate("/mypage/edit")}
                  className="bg-opacity-20 hover:bg-opacity-30 rounded-full bg-white p-2 transition"
                >
                  <img
                    src="/images/modify_btn.png"
                    alt="Edit"
                    className="h-5 w-5"
                  />
                </button>
                <button
                  onClick={() => navigate("/mypage/info")}
                  className="bg-opacity-20 hover:bg-opacity-30 rounded-full bg-white p-2 transition"
                >
                  <img
                    src="/images/setting_btn.png"
                    alt="Settings"
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 팀 엠블럼 */}
          <div className="ml-auto flex h-full items-center pb-4">
            <img
              src={`/images/${cheeringTeamName}_emb.png`}
              alt="팀 엠블럼"
              className="h-24 w-24 object-contain"
              onError={e => {
                e.currentTarget.src = "/images/doosan_emb.png";
              }}
            />
          </div>
        </div>
      </section>

      {/* 직관 온도 */}
      <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-medium text-gray-800">직관 온도</span>
          <span className="text-lg font-semibold text-red-500">
            {userTemp !== null ? `${userTemp.toFixed(1)}℃` : "–"}
          </span>
        </div>
        <div className="relative h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="absolute top-0 left-0 h-full bg-red-500"
            style={{
              width: userTemp !== null ? `${(userTemp / 50) * 100}%` : "0%",
            }}
          />
        </div>
      </section>

      {/* 작성한 매칭 글 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-gray-800">
          작성한 매칭 글
        </h2>
        <div className="space-y-4">
          {dummyPosts.map(post => (
            <div
              key={post.id}
              className="flex items-start justify-between rounded-xl bg-white p-6 shadow-sm"
            >
              <div>
                <div className="mb-2 flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                  <span className="text-sm text-gray-600">
                    {nickname} · 방금
                  </span>
                </div>
                <h3 className="mb-1 text-base font-semibold">{post.text}</h3>
                <p className="text-sm text-gray-500">
                  안녕하세요 저는 송파구 사는 두산 팬이고…
                </p>
              </div>
              <div className="space-y-2 text-right">
                <div className="flex flex-col items-end space-y-1">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                    {cheeringTeamName}
                  </span>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                    티켓있어요
                  </span>
                </div>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
