// src/pages/Login/components/NickNameInput.tsx
import React from 'react';

interface NicknameInputProps {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  nicknameCheckResult: 'available' | 'duplicate' | null;
  setNicknameCheckResult: React.Dispatch<React.SetStateAction<'available' | 'duplicate' | null>>;
  onNext: () => void;
}

const NicknameInput: React.FC<NicknameInputProps> = ({
  nickname,
  setNickname,
  nicknameCheckResult,
  setNicknameCheckResult,
  onNext,
}) => {
  const handleNicknameCheck = () => {
    if (nickname.trim() === '') return;
    // 예시 로직
    if (nickname === 'test') {
      setNicknameCheckResult('duplicate');
    } else {
      setNicknameCheckResult('available');
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-16 px-4">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#081A3A]">
          DUGOUT에 오신것을 환영해요
        </h1>
        <p className="mt-2 text-sm text-[#081A3A]">
          시작을 위해 간단한 정보를 알려주세요
        </p>
      </div>

      {/* Step Indicator */}
      <div className="w-full max-w-md flex items-center justify-start mb-6">
        <span className="ml-2 text-base font-medium text-[#081A3A]">
          닉네임
        </span>
      </div>

      {/* 입력 카드 */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <div className="flex gap-2">
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setNicknameCheckResult(null);
            }}
          />
          <button
            type="button"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            onClick={handleNicknameCheck}
          >
            중복 확인
          </button>
        </div>
        {nicknameCheckResult === 'available' && (
          <p className="mt-2 text-sm text-green-500 text-center">
            사용 가능한 닉네임입니다.
          </p>
        )}
        {nicknameCheckResult === 'duplicate' && (
          <p className="mt-2 text-sm text-red-500 text-center">
            이미 사용 중인 닉네임입니다.
          </p>
        )}
      </div>

      {/* 다음 단계 버튼 */}
      <button
        type="button"
        disabled={nicknameCheckResult !== 'available'}
        onClick={onNext}
        className={`
          mt-8 w-full max-w-md py-3 rounded
          ${nicknameCheckResult === 'available'
            ? 'bg-black text-white hover:bg-gray-800'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
        `}
      >
        다음 단계로
      </button>

      {/* 이전 단계 링크 */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="mt-4 text-sm text-gray-600 hover:underline"
      >
        이전 단계로 돌아가기
      </button>
    </div>
  );
};

export default NicknameInput;
