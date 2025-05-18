import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

interface Team {
  id: number;
  name: string;
  img: string;
}

interface TeamSelectionProps {
  selectedTeam: string | null;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
  onNext: () => void;
}

// 팀 목록에 id와 name, img를 정의
const teams: Team[] = [
  { id: 7, name: '두산 베어스',   img: '/images/doosan_emb.png' },
  { id: 1, name: 'LG 트윈스',     img: '/images/lg_emb.png' },
  { id: 8, name: '키움 히어로즈', img: '/images/kiwoom_emb.png' },
  { id: 3, name: '삼성 라이온즈', img: '/images/samsung_emb.png' },
  { id: 4, name: 'KT 위즈',       img: '/images/kt_emb.png' },
  { id: 2, name: 'SSG 랜더스',    img: '/images/ssg_emb.png' },
  { id: 10, name: '한화 이글스',    img: '/images/hanwha_emb.png' },
  { id: 5, name: '롯데 자이언츠', img: '/images/lotte_emb.png' },
  { id: 6, name: 'NC 다이노스',    img: '/images/nc_emb.png' },
  { id: 9, name: 'KIA 타이거즈',  img: '/images/kia_emb.png' },
];

const TeamSelection: React.FC<TeamSelectionProps> = ({
  selectedTeam,
  setSelectedTeam,
  onNext,
}) => {
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!selectedTeam) return;
    // 선택된 팀 이름으로 id 찾기
    const team = teams.find((t) => t.name === selectedTeam);
    if (!team) {
      alert('선택된 팀을 찾을 수 없습니다.');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      console.log('Selected team:', selectedTeam, 'Team ID:', team.id);
      console.log('Using token:', token);

      const res = await fetch('/login/cheeringTeamId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ cheeringTeamId: team.id }),
      });

      console.log('Response status:', res.status);
      const data = await res.json().catch(() => null);
      console.log('Response body:', data);

      if (res.ok) {
        onNext();
      } else {
        console.error('Error updating cheering team:', res.status, data);
        alert(data?.message || '응원 팀 업데이트에 실패했습니다.');
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('네트워크 오류로 응원 팀 설정에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen px-4 py-16">
      {/* 헤더 */}
      <h1 className="text-3xl font-bold text-[#081A3A] mb-2">
        DUGOUT에 오신것을 환영해요
      </h1>
      <p className="text-sm text-[#5B5B5B] mb-12">
        시작을 위해 간단한 정보를 알려주세요
      </p>

      {/* 부제 */}
      <h2 className="text-base font-medium text-[#081A3A] mb-6">
        응원하는 팀을 선택해주세요.
      </h2>

      {/* 팀 카드 그리드 */}
      <div className="grid grid-cols-5 gap-4 w-full max-w-[800px] mb-12">
        {teams.map((team) => (
          <button
            key={team.id}
            type="button"
            onClick={() => setSelectedTeam(team.name)}
            className={
              `relative flex flex-col items-center p-6 rounded-xl cursor-pointer transition ${
                selectedTeam === team.name ? 'bg-blue-50' : 'bg-white hover:bg-gray-100'
              }`
            }
          >
            <img
              src={team.img}
              alt={team.name}
              className="w-20 h-20 object-contain"
            />
            <p className="mt-2 text-sm text-center text-[#081A3A]">
              {team.name}
            </p>
            {selectedTeam === team.name && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 선택 완료 버튼 */}
      <button
        type="button"
        onClick={handleNext}
        disabled={!selectedTeam}
        className={
          `w-full max-w-[800px] py-3 rounded-xl mb-4 transition ${
            selectedTeam
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`
        }
      >
        선택 완료
      </button>

      {/* 이전 단계로 돌아가기 */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm text-gray-600 hover:underline"
      >
        이전 단계로 돌아가기
      </button>
    </div>
  );
};

export default TeamSelection;
