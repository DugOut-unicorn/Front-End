import React, { useState } from 'react';

function Withdrawal() {
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [team, setTeam] = useState('롯데 자이언츠');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`닉네임: ${nickname}\n소개: ${introduction}\n응원팀: ${team}\n저장 완료!`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto font-sans">
      {/* 닉네임 변경 */}
      <div className="mb-5">
        <label htmlFor="nickname" className="block mb-2 font-bold">
          닉네임 변경
        </label>
        <input
          id="nickname"
          type="text"
          placeholder="새로운 닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
      </div>

      {/* 자기 소개 변경 */}
      <div className="mb-5">
        <label htmlFor="introduction" className="block mb-2 font-bold">
          자기 소개 변경
        </label>
        <textarea
          id="introduction"
          placeholder="내용을 입력해주세요."
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded resize-none"
        />
      </div>

      {/* 응원 팀 변경 (드롭다운) */}
      <div className="mb-5">
        <label htmlFor="team" className="block mb-2 font-bold">
          응원 팀 변경
        </label>
        <select
          id="team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        >
          <option value="롯데 자이언츠">롯데 자이언츠</option>
          <option value="두산 베어스">두산 베어스</option>
          <option value="키움 히어로즈">키움 히어로즈</option>
          <option value="NC 다이노스">NC 다이노스</option>
          <option value="KIA 타이거즈">KIA 타이거즈</option>
          <option value="KT 위즈">KT 위즈</option>
          <option value="LG 트윈스">LG 트윈스</option>
          <option value="삼성 라이온즈">삼성 라이온즈</option>
          <option value="SSG 랜더스">SSG 랜더스</option>
          <option value="한화 이글스">한화 이글스</option>
        </select>
      </div>

      {/* 저장 버튼 */}
      <div className="text-right">
        <button
          type="submit"
          className="w-28 h-10 bg-black text-white rounded cursor-pointer text-justify-end"
        >
          저장
        </button>
      </div>
    </form>
  );
}

export default Withdrawal;
