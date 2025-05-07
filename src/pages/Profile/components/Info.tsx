// src/pages/Profile/components/Info.tsx
import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Info() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 읽기 전용 데이터
  const name = '전민재';
  const birthday = '1999년 06월 30일';
  const gender = '남성';
  const email = 'i-am-minjae@gmail.com';
  const phone = '010-1234-5678';

  const handleConfirmWithdrawal = () => {
    // TODO: 탈퇴 API 호출
    alert('회원탈퇴가 완료되었습니다.');
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 w-[400px] h-[444px] mx-auto">
      {/* 카드 컨테이너: pt-16으로 위쪽 패딩 확보 */}
      <div className="relative max-w-lg mx-auto rounded-lg shadow pt-16 px-6 pb-6 space-y-6">
        {/* 뒤로가기 버튼: 카드 안쪽 top-6 (24px) 위치 */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center text-gray-700"
        >
          <ChevronLeft size={24} />
          <span className="ml-2 t-button2">개인정보</span>
        </button>

        {/* 정보 폼 (읽기 전용) */}
        <div className="space-y-5">
          {[
            { label: '이름', value: name },
            { label: '생년월일', value: birthday },
            { label: '성별', value: gender },
            { label: '이메일', value: email },
            { label: '전화번호', value: phone },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="block mb-1 font-bold">{label}</label>
              <input
                type="text"
                readOnly
                value={value}
                className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          ))}
        </div>

        {/* 회원탈퇴 버튼 */}
        <div className="text-right">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            회원탈퇴
          </button>
        </div>
      </div>

      {/* ───── 탈퇴 확인 모달 ───── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 rounded-xl shadow-lg max-w-sm w-full p-6 relative">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {/* 타이틀 */}
            <h2 className="text-xl font-bold mb-2">회원 탈퇴</h2>
            <p className="text-center text-gray-600 mb-6">
              탈퇴 시, 모든 데이터가 영구적으로 사라집니다.
            </p>

            {/* 액션 버튼 */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                취소하기
              </button>
              <button
                onClick={handleConfirmWithdrawal}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
