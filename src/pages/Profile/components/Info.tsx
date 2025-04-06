import React, { useState } from 'react';

function Info() {
  // 읽기 전용 데이터
  const name = '전민재';
  const birthday = '1999년 06월 30일';
  const gender = '남성';
  const email = 'i-am-minjae@gmail.com';
  const phone = '010-1234-5678';

  // 모달(팝업) 열림 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWithdrawal = () => {
    alert('회원탈퇴가 완료되었습니다.');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto font-sans p-4 relative">
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 font-bold">
          이름
        </label>
        <input
          id="name"
          type="text"
          value={name}
          readOnly
          className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="birthday" className="block mb-2 font-bold">
          생년월일
        </label>
        <input
          id="birthday"
          type="text"
          value={birthday}
          readOnly
          className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="gender" className="block mb-2 font-bold">
          성별
        </label>
        <input
          id="gender"
          type="text"
          value={gender}
          readOnly
          className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 font-bold">
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          readOnly
          className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="phone" className="block mb-2 font-bold">
          전화번호
        </label>
        <input
          id="phone"
          type="text"
          value={phone}
          readOnly
          className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* 회원탈퇴 버튼 */}
      <div className="text-right">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-28 h-10 bg-red-500 text-white rounded cursor-pointer"
        >
          회원탈퇴
        </button>
      </div>

      {/* 모달 (회원탈퇴 확인 팝업) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from-black/20 to-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <p className="mb-4 text-center">
              모든 데이터가 삭제됩니다. <br />
              정말 탈퇴하시겠습니까?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleWithdrawal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                탈퇴
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Info;
