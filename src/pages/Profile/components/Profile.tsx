import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTeamLogoByIdx,
  getTeamNameByIdx,
} from "../../../hooks/TeamNameChanger"; // 실제 경로에 맞게 수정!

interface ProfileData {
  userIdx: number;
  nickname: string;
  cheeringTeamId: number;
  bio: string;
  profileImageUrl: string;
  userTemp: number;
}

interface MyMatchingPostDto {
  matchingPostIdx: number;
  userIdx: number;
  gameIdx: number;
  stadiumIdx: number;
  teamIdx: number;
  title: string;
  context: string;
  haveTicket: boolean;
  createdAt: string;
  isMatched: boolean;
}

export default function Profile() {
  const navigate = useNavigate();

  // 프로필 정보 상태
  const [profile, setProfile] = useState<ProfileData | null>(null);
  // 내가 쓴 매칭 글 상태
  const [myPosts, setMyPosts] = useState<MyMatchingPostDto[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("토큰이 없습니다.");

        // 1) 프로필 정보 조회
        const profileRes = await fetch(
          `${import.meta.env.VITE_API_URL}/mypage/myTemp`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!profileRes.ok)
          throw new Error(`프로필 조회 실패: ${profileRes.status}`);
        const profileData: ProfileData = await profileRes.json();
        setProfile(profileData);

        // 2) 내가 쓴 매칭 글 목록 조회 (/mypage/myPost 호출)
        setIsLoadingPosts(true);
        setPostsError(null);

        const postsRes = await fetch(
          `${import.meta.env.VITE_API_URL}/mypage/myPost`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!postsRes.ok)
          throw new Error(`내 글 조회 실패: ${postsRes.status}`);
        const postsData: MyMatchingPostDto[] = await postsRes.json();
        setMyPosts(postsData);
      } catch (err: any) {
        console.error("프로필 또는 매칭 글 불러오기 실패:", err);
        setPostsError("내가 쓴 매칭 글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoadingPosts(false);
      }
    })();
  }, []);

  // 팀명/로고 파생 값
  const cheeringTeamName =
    profile?.cheeringTeamId !== undefined && profile?.cheeringTeamId !== null
      ? getTeamNameByIdx(profile.cheeringTeamId)
      : "로딩 중";
  const cheeringTeamLogo =
    profile?.cheeringTeamId !== undefined && profile?.cheeringTeamId !== null
      ? getTeamLogoByIdx(profile.cheeringTeamId)
      : "/images/default_team_emb.png";

  return (
    <>
      {/* 헤더 배너 */}
      <section className="relative mb-8 h-48 w-full bg-blue-900">
        <div className="bg-opacity-75 absolute inset-0 bg-blue-900" />
        <div className="relative flex h-full items-start px-8 pt-6">
          {/* 프로필 + 소개 */}
          <div className="flex items-start space-x-6">
            <img
              src={profile?.profileImageUrl || "/images/user_avatar.png"}
              alt="프로필"
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />
            <div className="text-white">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">
                  {profile?.nickname || "로딩 중..."}
                </h1>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-blue-900">
                  {cheeringTeamName}
                </span>
              </div>
              <p className="mt-1 text-sm">{profile?.bio || "자기소개가 없습니다."}</p>
              {/* 수정/설정 버튼 */}
              <div className="mt-3 flex items-center space-x-3">
                <button
                  onClick={() => navigate("/mypage/edit")}
                  className="bg-opacity-20 hover:bg-opacity-30 rounded-full bg-blue p-2 transition"
                >
                  <img
                    src="/images/modify_btn.png"
                    alt="Edit"
                    className="h-5 w-5"
                  />
                </button>
                <button
                  onClick={() => navigate("/mypage/info")}
                  className="bg-opacity-20 hover:bg-opacity-30 rounded-full bg-blue p-2 transition"
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
              src={cheeringTeamLogo}
              alt="팀 엠블럼"
              className="h-24 w-24 object-contain"
              onError={(e) => {
                e.currentTarget.src = "/images/default_team_emb.png";
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
            {profile?.userTemp !== undefined && profile?.userTemp !== null
              ? `${profile.userTemp.toFixed(1)}℃`
              : "–"}
          </span>
        </div>
        <div className="relative h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="absolute top-0 left-0 h-full bg-red-500"
            style={{
              width:
                profile?.userTemp !== undefined && profile?.userTemp !== null
                  ? `${(profile.userTemp / 50) * 100}%`
                  : "0%",
            }}
          />
        </div>
      </section>

      {/* 작성한 매칭 글 */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-gray-800">
          작성한 매칭 글
        </h2>
        {isLoadingPosts && (
          <p className="text-center text-gray-500">불러오는 중...</p>
        )}
        {postsError && (
          <p className="text-center text-red-500">{postsError}</p>
        )}
        {!isLoadingPosts && !postsError && myPosts.length === 0 && (
          <p className="text-center text-gray-500">
            작성한 매칭 글이 없습니다.
          </p>
        )}
        {!isLoadingPosts && !postsError && myPosts.length > 0 && (
          <div className="space-y-4">
            {myPosts.map((post) => (
              <div
                key={post.matchingPostIdx}
                className="flex items-start justify-between rounded-xl bg-white p-6 shadow-sm hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  navigate(`/matching/articles/${post.matchingPostIdx}`)
                }
              >
                <div>
                  <div className="mb-2 flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                    <span className="text-sm text-gray-600">
                      {profile?.nickname || ""} ·{" "}
                      {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <h3 className="mb-1 text-base font-semibold">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {post.context.length > 30
                      ? post.context.slice(0, 30) + "…"
                      : post.context}
                  </p>
                </div>
                <div className="space-y-2 text-right">
                  <div className="flex flex-col items-end space-y-1">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                      {cheeringTeamName}
                    </span>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                      {post.haveTicket ? "티켓 있음" : "티켓 없음"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
