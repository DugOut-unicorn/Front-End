import React, { useState, useEffect } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    nickname: '',
    email: '',
    birthday: '',
    phone: '',
    gender: 0,
  });

  useEffect(() => {
    const jwt = localStorage.getItem('jwtToken');
    if (!jwt) {
      alert('로그인 정보가 없습니다.');
      navigate('/login');
      return;
    }
    (async () => {
      try {
        const res = await fetch('/mypage/myTemp', {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setProfile({
          nickname: data.nickname ?? '',
          email: data.email ?? '',
          birthday: data.birthday ?? '',
          phone: data.phone ?? '',
          gender: data.gender ?? 0,
        });
      } catch (err) {
        console.error('프로필 조회 실패:', err);
        alert('프로필 정보를 불러오는데 실패했습니다.');
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
    const jwt = localStorage.getItem('jwtToken');
    if (!jwt) {
      alert('로그인 정보가 없습니다.');
      return;
    }
    try {
      const body = {
        birth: profile.birthday,
        gender: String(profile.gender),
        phoneNumber: profile.phone,
      };
      const res = await fetch('/mypage/editInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.message || `HTTP error ${res.status}`);
      }
      alert('정보가 성공적으로 업데이트되었습니다.');
      setIsEditing(false);
      setIsEditingBirthday(false);
      setIsEditingPhone(false);
      setIsEditingGender(false);
    } catch (error: any) {
      console.error('정보 수정 실패:', error);
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
    alert('회원탈퇴가 완료되었습니다.');
    setIsModalOpen(false);
  };

  const { nickname, email, birthday, phone, gender } = profile;

  return (
    <div className="bg-gray-100 w-[400px] mx-auto mt-8">
      <div className="relative bg-white rounded-lg shadow pt-16 px-6 pb-6 space-y-6">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 flex items-center text-gray-700">
          <ChevronLeft size={24} />
          <span className="ml-2 t-button2">개인정보</span>
        </button>

        <div className="space-y-5">
          <div>
            <label className="block mb-1 font-bold">이름</label>
            <input
              type="text"
              readOnly
              value={nickname}
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">생년월일</label>
            <input
              type="date"
              value={birthday}
              onChange={e => setProfile(prev => ({ ...prev, birthday: e.target.value }))}
              readOnly={!isEditingBirthday}
              className={`w-full p-3 border border-gray-300 rounded ${
                !isEditingBirthday ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">성별</label>
            {isEditingGender ? (
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 0}
                    onChange={() => setProfile(prev => ({ ...prev, gender: 0 }))}
                    className="mr-2"
                  />남자
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === 1}
                    onChange={() => setProfile(prev => ({ ...prev, gender: 1 }))}
                    className="mr-2"
                  />여자
                </label>
              </div>
            ) : (
              <input
                type="text"
                readOnly
                value={gender === 0 ? '남자' : '여자'}
                className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 font-bold">이메일</label>
            <input
              type="email"
              readOnly
              value={email}
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">전화번호</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              readOnly={!isEditingPhone}
              className={`w-full p-3 border border-gray-300 rounded ${
                !isEditingPhone ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end items-center space-x-4 pt-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >저장하기</button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >취소</button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleToggleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >수정하기</button>
          )}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >회원탈퇴</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 rounded-xl shadow-lg max-w-sm w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-2">회원 탈퇴</h2>
            <p className="text-center text-gray-600 mb-6">
              탈퇴 시, 모든 데이터가 영구적으로 사라집니다.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >취소하기</button>
              <button
                onClick={handleConfirmWithdrawal}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >회원 탈퇴하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
