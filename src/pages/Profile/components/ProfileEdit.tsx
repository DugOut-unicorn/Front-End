// src/pages/Profile/components/ProfileEdit.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const teams = [
  '롯데 자이언츠',
  '두산 베어스',
  '키움 히어로즈',
  'NC 다이노스',
  'KIA 타이거즈',
  'KT 위즈',
  'LG 트윈스',
  '삼성 라이온즈',
  'SSG 랜더스',
  '한화 이글스',
];

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('야구조아');
  const [introduction, setIntroduction] = useState(
    '안녕하세요, 경기도 고양사는 23살 대학생 입니다!'
  );
  const [team, setTeam] = useState(teams[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출 로직
    alert('변경사항이 저장되었습니다.');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-8 font-sans">
      <div className="relative w-[400px] bg-gray rounded-lg shadow overflow-hidden">
        {/* 뒤로가기 + 제목 */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center text-gray-700 z-10"
        >
          <ChevronLeft size={24} />
          <span className="ml-2 t-button2">프로필 수정</span>
        </button>

        {/* 카드 콘텐츠 */}
        <div className="pt-16 px-6 pb-8 space-y-8">
          {/* 프로필 이미지 & 변경 버튼 */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src="/images/user_avatar.png"
                alt="프로필"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              className="t-button2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              프로필 이미지 변경
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 닉네임 */}
            <div>
              <label
                htmlFor="nickname"
                className="block mb-2 t-body1 text-gray-800"
              >
                닉네임 변경
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* 자기소개 */}
            <div>
              <label
                htmlFor="introduction"
                className="block mb-2 t-body1 text-gray-800"
              >
                자기소개 변경
              </label>
              <textarea
                id="introduction"
                rows={4}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* 응원팀 선택 */}
            <div>
              <label
                htmlFor="team"
                className="block mb-2 t-body1 text-gray-800"
              >
                응원팀 변경
              </label>
              <select
                id="team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {teams.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* 저장 버튼 */}
            <div className="text-center">
              <button
                type="submit"
                className="t-button1 w-40 h-10 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                변경사항 저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
