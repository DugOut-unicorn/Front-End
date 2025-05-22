import { useState, useEffect } from "react";
import { ChevronLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      alert("로그인 정보가 없습니다.");
      navigate("/login");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/mypage/myTemp", {
          headers: { Authorization: `Bearer ${jwt}` },
        });
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
      const res = await fetch("/mypage/editInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
      });
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
    // 선택적으로 원래 값으로 되돌리려면 fetch 다시 호출
  };

  const handleConfirmWithdrawal = () => {
    alert("회원탈퇴가 완료되었습니다.");
    setIsModalOpen(false);
  };

  const { nickname, email, birthday, phone, gender } = profile;

  return (
    <div className="mx-auto mt-8 w-[400px] bg-gray-100">
      <div className="relative space-y-6 rounded-lg bg-white px-6 pt-16 pb-6 shadow">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center text-gray-700"
        >
          <ChevronLeft size={24} />
          <span className="t-button2 ml-2">개인정보</span>
        </button>

        <div className="space-y-5">
          <div>
            <label className="mb-1 block font-bold">이름</label>
            <input
              type="text"
              readOnly
              value={nickname}
              className="w-full cursor-not-allowed rounded border border-gray-300 bg-gray-100 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold">생년월일</label>
            <input
              type="date"
              value={birthday}
              onChange={e =>
                setProfile(prev => ({ ...prev, birthday: e.target.value }))
              }
              readOnly={!isEditingBirthday}
              className={`w-full rounded border border-gray-300 p-3 ${
                !isEditingBirthday ? "cursor-not-allowed bg-gray-100" : ""
              }`}
            />
          </div>

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
                      setProfile(prev => ({ ...prev, gender: 0 }))
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
                      setProfile(prev => ({ ...prev, gender: 1 }))
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

          <div>
            <label className="mb-1 block font-bold">이메일</label>
            <input
              type="email"
              readOnly
              value={email}
              className="w-full cursor-not-allowed rounded border border-gray-300 bg-gray-100 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold">전화번호</label>
            <input
              type="tel"
              value={phone}
              onChange={e =>
                setProfile(prev => ({ ...prev, phone: e.target.value }))
              }
              readOnly={!isEditingPhone}
              className={`w-full rounded border border-gray-300 p-3 ${
                !isEditingPhone ? "cursor-not-allowed bg-gray-100" : ""
              }`}
            />
          </div>
        </div>

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
  );
}
