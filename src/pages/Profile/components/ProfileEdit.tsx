// src/pages/Profile/components/ProfileEdit.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const teams = [
  'LG 트윈스', 'SSG 랜더스', '삼성 라이온즈',
  'KT 위즈', '롯데 자이언츠', 'NC 다이노스',
  '두산 베어스', '키움 히어로즈', 'KIA 타이거즈', '한화 이글스',
];

enum CheckResult {
  None = 'none',
  Available = 'available',
  Duplicate = 'duplicate',
}

export default function ProfileEdit() {
  const navigate = useNavigate();

  // personal info
  const [nickname, setNickname] = useState('');
  const [checkResult, setCheckResult] = useState<CheckResult>(CheckResult.None);
  const [introduction, setIntroduction] = useState('');
  const [team, setTeam] = useState(teams[0]);

  // image upload state
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // existing profile load
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
          credentials: 'include',
          headers: { Authorization: `Bearer ${jwt}` },
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setNickname(data.nickname);
        setIntroduction(data.bio);
        setTeam(teams[data.cheeringTeamId - 1]);
        setPreviewUrl(data.profileImageUrl);
      } catch (err) {
        console.error('프로필 조회 실패:', err);
        alert('프로필 정보를 불러오는데 실패했습니다.');
        navigate(-1);
      }
    })();
  }, [navigate]);

  // nickname check
  const checkNickname = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    const jwt = localStorage.getItem('jwtToken');
    if (!jwt) { alert('로그인 정보가 없습니다.'); return; }
    try {
      const res = await fetch('/login/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ nickname }),
      });
      if (res.status === 200) {
        setCheckResult(CheckResult.Available);
        alert('사용 가능한 닉네임입니다.');
      } else if (res.status === 400) {
        setCheckResult(CheckResult.Duplicate);
        alert('이미 사용 중인 닉네임입니다.');
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.error('닉네임 중복 확인 실패:', err);
      alert('닉네임 중복 확인 중 오류가 발생했습니다.');
    }
  };

  // file preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreviewUrl(URL.createObjectURL(f));
  };

  const handleImageUpload = async () => {
    if (!file) return alert('업로드할 이미지를 선택하세요.');
    const jwt = localStorage.getItem('jwtToken');
    const form = new FormData(); form.append('file', file);
    const res = await fetch('/mypage/profile-image', {
      method: 'POST', credentials: 'include',
      headers: { Authorization: `Bearer ${jwt}` }, body: form,
    });
    if (!res.ok) throw new Error(res.statusText);
    const body = await res.json();
    if (!body.success) throw new Error(body.message);
    const newUrl = `${body.data}?t=${Date.now()}`;
    alert('이미지가 성공적으로 변경되었습니다.');
    navigate('/mypage', { state: { newImageUrl: newUrl } });
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkResult !== CheckResult.Available) {
      return alert('닉네임 중복 확인을 해주세요.');
    }
    const jwt = localStorage.getItem('jwtToken');
    if (!jwt) return alert('로그인 정보가 유효하지 않습니다.');
    const cheeringTeamId = teams.indexOf(team) + 1;
    try {
      const res = await fetch('/mypage/editPersonal', {
        method: 'POST', credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ nickname, bio: introduction, cheeringTeamId }),
      });
      if (!res.ok) {
        const err = await res.json(); throw new Error(err.message);
      }
      alert('프로필이 성공적으로 수정되었습니다.');
      navigate('/mypage');
    } catch (error: any) {
      console.error(error);
      alert(`오류: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-8">
      <div className="relative w-[400px] bg-white rounded-lg shadow">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 flex items-center">
          <ChevronLeft size={24} /><span className="ml-2">프로필 수정</span>
        </button>
        <div className="pt-16 px-6 pb-8 space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img src={previewUrl || '/images/user_avatar.png'} alt="프로필" className="object-cover w-full h-full" />
            </div>
            <label className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-50">
              이미지 선택
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
            <button type="button" onClick={handleImageUpload} className="px-4 py-2 bg-blue-600 text-white rounded">
              이미지 업로드
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block mb-1">닉네임</label>
              <div className="flex">
                <input id="nickname" type="text" value={nickname} onChange={e => { setNickname(e.target.value); setCheckResult(CheckResult.None); }} className="flex-1 border px-3 py-2 rounded-l" />
                <button type="button" onClick={checkNickname} className="px-4 bg-gray-200 border-t border-b border-r rounded-r">
                  중복 확인
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="introduction" className="block mb-1">자기소개</label>
              <textarea id="introduction" rows={3} value={introduction} onChange={e => setIntroduction(e.target.value)} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label htmlFor="team" className="block mb-1">응원팀</label>
              <select id="team" value={team} onChange={e => setTeam(e.target.value)} className="w-full border px-3 py-2 rounded">
                {teams.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="px-6 py-2 bg-black text-white rounded">
                변경사항 저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
