import React from 'react';

interface TeamSelectionProps {
  selectedTeam: string | null;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
  onNext: () => void;
  onPrev: () => void;          // ← 추가
  currentStep: number;
}

const TeamSelection: React.FC<TeamSelectionProps> = ({
  selectedTeam,
  setSelectedTeam,
  onNext,
  onPrev,                     // ← 추가
  currentStep,
}) => {
  const teams = [
    { name: '두산 베어스', img: '/images/dusan_emb.png' },
    { name: 'LG 트윈스',   img: '/images/lg_emb.png' },
    { name: '키움 히어로즈', img: '/images/kiwoom_emb.png' },
    { name: '삼성 라이온즈', img: '/images/samsung_emb.png' },
    { name: 'KT 위즈',     img: '/images/kt_emb.png' },
    { name: 'SSG 랜더스',   img: '/images/ssg_emb.png' },
    { name: '한화 이글스',  img: '/images/hanhwa_emb.png' },
    { name: '롯데 자이언츠', img: '/images/lotte_emb.png' },
    { name: 'NC 다이노스',  img: '/images/nc_emb.png' },
    { name: 'KIA 타이거즈', img: '/images/kia_emb.png' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      {/* 단계 표시 */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between mb-2">
          {['STEP 1', 'STEP 2', 'STEP 3'].map((step, idx) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full ${
                  currentStep >= idx + 1 ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
              <span
                className={`text-sm mt-2 ${
                  currentStep >= idx + 1 ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="h-px bg-gray-300" />
      </div>

      <h1 className="text-2xl font-bold mb-8">응원팀 선택</h1>

      {/* 팀 카드 */}
      <div className="grid grid-cols-4 gap-6 mb-6 w-full max-w-md">
        {teams.map((team) => (
          <div
            key={team.name}
            className={`flex flex-col items-center bg-white cursor-pointer border ${
              selectedTeam === team.name ? 'border-red-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedTeam(team.name)}
          >
            <img src={team.img} alt={team.name} className="w-20 h-20 object-contain" />
            <p className="mt-2 text-sm text-center">{team.name}</p>
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <div className="w-full max-w-md flex flex-col gap-2">
        <button
          className="bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          onClick={onNext}
        >
          다음
        </button>
        <button
          className="border border-gray-400 text-gray-600 py-3 rounded hover:bg-gray-100 transition"
          onClick={onPrev}
        >
          이전으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default TeamSelection;
