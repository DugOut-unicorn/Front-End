// src/pages/Profile/ProfileEdit.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "./components/BackHeader";
import ImageUploader from "./components/ImageUploader";
import NicknameField from "./components/NicknameField";
import IntroductionField from "./components/IntroductionField";
import TeamSelect from "./components/Teamselect";
import SubmitButton from "./components/SubmitButton";

const teamsList = [
  "LG 트윈스",
  "SSG 랜더스",
  "삼성 라이온즈",
  "KT 위즈",
  "롯데 자이언츠",
  "NC 다이노스",
  "두산 베어스",
  "키움 히어로즈",
  "KIA 타이거즈",
  "한화 이글스",
];

export default function ProfileEdit() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [checkResult, setCheckResult] = useState<
    "none" | "available" | "duplicate"
  >("none");
  const [introduction, setIntroduction] = useState("");
  const [team, setTeam] = useState(teamsList[0]);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      alert("로그인 정보가 없습니다.");
      navigate("/login");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/mypage/myTemp`,
          {
            credentials: "include",
            headers: { Authorization: `Bearer ${jwt}` },
          },
        );
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setNickname(data.nickname);
        setIntroduction(data.bio);
        setTeam(teamsList[data.cheeringTeamId - 1]);
        setPreviewUrl(data.profileImageUrl);
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        alert("프로필 정보를 불러오는데 실패했습니다.");
        navigate(-1);
      }
    })();
  }, [navigate]);

  const checkNickname = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      alert("로그인 정보가 없습니다.");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/login/nickname`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ nickname }),
        },
      );
      if (res.status === 200) {
        setCheckResult("available");
        alert("사용 가능한 닉네임입니다.");
      } else if (res.status === 400) {
        setCheckResult("duplicate");
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.error("닉네임 중복 확인 실패:", err);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleFileChange = (f: File) => {
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const handleImageUpload = async () => {
    if (!file) return alert("업로드할 이미지를 선택하세요.");
    const jwt = localStorage.getItem("jwtToken");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/mypage/profile-image`,
      {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${jwt}` },
        body: form,
      },
    );
    if (!res.ok) throw new Error(res.statusText);
    const body = await res.json();
    if (!body.success) throw new Error(body.message);
    const newUrl = `${body.data}?t=${Date.now()}`;
    alert("이미지가 성공적으로 변경되었습니다.");
    navigate("/mypage", { state: { newImageUrl: newUrl } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkResult !== "available") {
      return alert("닉네임 중복 확인을 해주세요.");
    }
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) return alert("로그인 정보가 유효하지 않습니다.");
    const cheeringTeamId = teamsList.indexOf(team) + 1;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/mypage/editPersonal`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ nickname, bio: introduction, cheeringTeamId }),
        },
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      alert("프로필이 성공적으로 수정되었습니다.");
      navigate("/mypage");
    } catch (error: any) {
      console.error(error);
      alert(`오류: ${error.message}`);
    }
  };

  return (
    <div className="relative flex min-h-screen justify-center bg-gray-100 py-8">
      {/* 1) BackHeader: 절대 위치로 화면 왼쪽 상단에 고정 */}
      <div className="absolute top-4 left-4">
        <BackHeader title="프로필 수정" />
      </div>

      {/* 2) 메인 컨테이너: 화면 중앙에 너비 제한 없이 채움 */}
      <div className="mx-auto w-full max-w-2xl px-8">
        {/* 3) 카드 배경 없이 바로 폼 콘텐츠 */}
        <div className="flex flex-col items-center space-y-8 px-8 py-6">
          {/* ▷ 이미지 업로더 */}
          <div className="flex flex-col items-center space-y-4">
            <ImageUploader
              previewUrl={previewUrl}
              onFileChange={handleFileChange}
              onUploadClick={handleImageUpload}
            />
          </div>

          {/* ▷ 입력 폼 */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <NicknameField
                nickname={nickname}
                onChange={setNickname}
                onCheck={checkNickname}
              />
              <IntroductionField
                introduction={introduction}
                onChange={setIntroduction}
              />
              <TeamSelect team={team} teams={teamsList} onChange={setTeam} />
              <SubmitButton disabled={checkResult !== "available"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
