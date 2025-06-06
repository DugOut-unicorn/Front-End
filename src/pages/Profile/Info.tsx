// src/pages/Profile/Info.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "./components/BackHeader";
import { X } from "lucide-react";

interface ProfileInfo {
  nickname: string;
  email: string;
  birthday: string;
  phone: string;
  gender: 0 | 1;
}

export default function Info() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBirthday, setIsEditingBirthday] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingGender, setIsEditingGender] = useState(false);

  const [profile, setProfile] = useState<ProfileInfo>({
    nickname: "",
    email: "",
    birthday: "",
    phone: "",
    gender: 0,
  });

  // 서버에서 내 프로필 정보 가져오기
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
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setProfile({
          nickname: data.nickname ?? "",
          email: data.email ?? "",
          birthday: data.birthday ?? "",
          phone: data.phone ?? "",
          gender: data.gender ?? 0,
        });
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        alert("프로필 정보를 불러오는데 실패했습니다.");
        navigate(-1);
      }
    })();
  }, [navigate]);

  const handleToggleEdit = () => {
    setIsEditing(true);
    setIsEditingBirthday(true);
    setIsEditingPhone(true);
    setIsEditingGender(true);
  };

  const handleSave = async () => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      alert("로그인 정보가 없습니다.");
      return;
    }
    try {
      const body = {
        birth: profile.birthday,
        gender: String(profile.gender),
        phoneNumber: profile.phone,
      };
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/mypage/editInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.message || `HTTP error ${res.status}`);
      }
      alert("정보가 성공적으로 업데이트되었습니다.");
      setIsEditing(false);
      setIsEditingBirthday(false);
      setIsEditingPhone(false);
      setIsEditingGender(false);
    } catch (error: any) {
      console.error("정보 수정 실패:", error);
      alert(`정보 수정 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsEditingBirthday(false);
    setIsEditingPhone(false);
    setIsEditingGender(false);
  };

  const handleConfirmWithdrawal = async () => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      alert("로그인 정보가 없습니다.");
      setIsModalOpen(false);
      navigate("/login");
      return;
    }

    if (!window.confirm("정말로 회원 탈퇴하시겠습니까?")) {
      return;
    }

    try {
      const res = await fetch("/mypage/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.message || `HTTP error ${res.status}`);
      }

      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userIdx");
      setIsModalOpen(false);
      navigate("/");
    } catch (error: any) {
      console.error("회원 탈퇴 실패:", error);
      alert(`회원 탈퇴 중 오류가 발생했습니다: ${error.message}`);
      setIsModalOpen(false);
    }
  };

  const { nickname, email, birthday, phone, gender } = profile;

  return (
    <>
      {/* ─── 최상위 래퍼: 화면을 채우고 회색 배경으로 만듭니다 ─── */}
      <div className="relative flex min-h-screen justify-center bg-gray-100 py-8">
        {/* ① BackHeader를 화면 왼쪽 상단에 고정 (절대 위치) */}
        <div className="absolute top-4 left-4 h-14">
          <BackHeader title="개인정보" />
        </div>

        {/* ② 메인 콘텐츠: 흰색 카드 없이 */}
        <div className="w-full max-w-md mx-auto px-6 space-y-5">
          {/* 이름 */}
          <div>
            <label className="mb-1 block font-bold">이름</label>
            <input
              type="text"
              readOnly
              value={nickname}
              className="w-full cursor-not-allowed rounded border border-gray-300 bg-gray-100 p-3"
            />
          </div>

          {/* 생년월일 */}
          <div>
            <label className="mb-1 block font-bold">생년월일</label>
            <input
              type="date"
              value={birthday}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, birthday: e.target.value }))
              }
              readOnly={!isEditingBirthday}
              className={`w-full rounded border border-gray-300 p-3 ${
                !isEditingBirthday ? "cursor-not-allowed bg-gray-100" : ""
              }`}
            />
          </div>

          {/* 성별 */}
          <div>
            <label className="mb-1 block font-bold">성별</label>
            {isEditingGender ? (
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 0}
                    onChange={() =>
                      setProfile((prev) => ({ ...prev, gender: 0 }))
                    }
                    className="mr-2"
                  />
                  남자
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 1}
                    onChange={() =>
                      setProfile((prev) => ({ ...prev, gender: 1 }))
                    }
                    className="mr-2"
                  />
                  여자
                </label>
              </div>
            ) : (
              <input
                type="text"
                readOnly
                value={gender === 0 ? "남자" : "여자"}
                className="w-full cursor-not-allowed rounded border border-gray-300 bg-gray-100 p-3"
              />
            )}
          </div>

          {/* 이메일 */}
          <div>
            <label className="mb-1 block font-bold">이메일</label>
            <input
              type="email"
              readOnly
              value={email}
              className="w-full cursor-not-allowed rounded border border-gray-300 bg-gray-100 p-3"
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="mb-1 block font-bold">전화번호</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, phone: e.target.value }))
              }
              readOnly={!isEditingPhone}
              className={`w-full rounded border border-gray-300 p-3 ${
                !isEditingPhone ? "cursor-not-allowed bg-gray-100" : ""
              }`}
            />
          </div>

          {/* 버튼 그룹 */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                >
                  저장하기
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-400"
                >
                  취소
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleToggleEdit}
                className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                수정하기
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-red-500 px-6 py-2 text-white transition hover:bg-red-600"
            >
              회원탈퇴
            </button>
          </div>
        </div>

        {/* 회원탈퇴 모달 (흰 배경 카드 그대로 유지) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="relative w-full max-w-sm rounded-xl bg-white/90 p-6 shadow-lg">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="mb-2 text-xl font-bold">회원 탈퇴</h2>
              <p className="mb-6 text-center text-gray-600">
                탈퇴 시, 모든 데이터가 영구적으로 사라집니다.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-lg border border-gray-300 py-2 text-gray-700 transition hover:bg-gray-100"
                >
                  취소하기
                </button>
                <button
                  onClick={handleConfirmWithdrawal}
                  className="flex-1 rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600"
                >
                  회원 탈퇴하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
