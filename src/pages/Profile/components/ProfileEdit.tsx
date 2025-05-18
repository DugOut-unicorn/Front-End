import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

// 팀 목록을 새로운 ID 순서(1~10)에 맞춘 순서로 정의
const teams = [
  'LG 트윈스',     // id 1
  'SSG 랜더스',   // id 2
  '삼성 라이온즈', // id 3
  'KT 위즈',      // id 4
  '롯데 자이언츠', // id 5
  'NC 다이노스',   // id 6
  '두산 베어스',   // id 7
  '키움 히어로즈', // id 8
  'KIA 타이거즈', // id 9
  '한화 이글스',   // id 10
];

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [team, setTeam] = useState(teams[0]);

  // 기존 프로필 불러와서 폼 초기화
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
        setNickname(data.nickname);
        setIntroduction(data.bio);
        // API 반환 cheeringTeamId(1~10)에 맞춰 인덱스는 id-1
        setTeam(teams[data.cheeringTeamId - 1]);
      } catch (err) {
        console.error('프로필 조회 실패:', err);
        alert('프로필 정보를 불러오는데 실패했습니다.');
        navigate(-1);
      }
    })();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jwt = localStorage.getItem('jwtToken');
    console.log('▶ jwtToken:', jwt);
    if (!jwt) {
      alert('로그인 정보가 유효하지 않습니다.');
      return;
    }

    // 선택된 팀 이름으로 인덱스(0 기반) 찾은 뒤 API에 보낼 id는 index+1
    const cheeringTeamId = teams.findIndex((t) => t === team) + 1;

    try {
      const res = await fetch('/mypage/editPersonal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ nickname, bio: introduction, cheeringTeamId }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || '프로필 수정 실패');
      }

      alert('프로필이 성공적으로 수정되었습니다.');
      navigate('/mypage');
    } catch (error: any) {
      console.error(error);
      alert(`오류: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-8 font-sans">
      <div className="relative w-[400px] bg-white rounded-lg shadow overflow-hidden">
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
                className="w-full h-10 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full h-24 py-2 px-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full h-10 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
