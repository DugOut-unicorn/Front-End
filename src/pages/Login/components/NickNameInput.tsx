import React from 'react';

interface NicknameInputProps {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  nicknameCheckResult: 'available' | 'duplicate' | null; // 상태 값을 비교해야 하므로 수정
  setNicknameCheckResult: React.Dispatch<React.SetStateAction<'available' | 'duplicate' | null>>;
  onNext: () => void;
}

const NicknameInput: React.FC<NicknameInputProps> = ({ nickname, setNickname, nicknameCheckResult, setNicknameCheckResult, onNext }) => {
  const handleNicknameCheck = () => {
    if (nickname.trim() === '') return;
    if (nickname === 'test') {
      setNicknameCheckResult('duplicate');
    } else {
      setNicknameCheckResult('available');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-8">회원가입</h1>

      <div className="w-full max-w-md bg-white p-6 shadow-md rounded mb-6">
        <label htmlFor="nickname" className="block mb-2 font-medium">닉네임</label>
        <div className="flex gap-2">
          <input
            id="nickname"
            type="text"
            placeholder="사용할 닉네임을 입력하세요"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button className="bg-black text-white px-4 py-2 rounded" onClick={handleNicknameCheck}>
            중복체크
          </button>
        </div>

        {/* 상태 값인 nicknameCheckResult로 비교 */}
        {nicknameCheckResult === 'available' && (
          <div className="mt-2 text-sm text-green-500 text-center">사용 가능한 닉네임입니다.</div>
        )}
        {nicknameCheckResult === 'duplicate' && (
          <div className="mt-2 text-sm text-red-500 text-center">이미 사용 중인 닉네임입니다.</div>
        )}
      </div>

      <button className="bg-black text-white w-full max-w-md py-3 rounded mb-2 hover:bg-gray-800" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

export default NicknameInput;
