import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NicknameInput from './components/NickNameInput';
import TeamSelection from './components/TeamSelection';
import Completion from './components/Complection';
import logo from '../../assets/main_logo.png';

const LoginPage = () => {
  const { id } = useParams(); // /signup/:id
  const navigate = useNavigate();

  /* --------- 공통 상태 --------- */
  const [nickname, setNickname] = useState('');
  const [nicknameCheckResult, setNicknameCheckResult] =
    useState<'available' | 'duplicate' | null>(null);

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  /* --------- 단계별 이후 처리 --------- */
  const goStep2 = () => {
    if (nicknameCheckResult === 'available') navigate('/signup/2');
    else alert('닉네임 중복 체크를 완료해주세요!');
  };

  const goStep3 = () => {
    if (selectedTeam) navigate('/signup/3');
    else alert('응원팀을 선택해주세요!');
  };

  const goHome = () => navigate('/'); // 수정: 홈 페이지로 이동

  /* =========================================================
     ❶ URL 파라미터(id)가 없으면 SNS 로그인 기본 화면
  ========================================================= */
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={logo} alt="dugout logo" className="w-40 h-40 mb-6 rounded-full" />
        <h1 className="text-xl font-bold mb-8">DUGOUT에 오신 것을 환영합니다!!!</h1>
        <p className="text-gray-500 mb-6">SNS 계정으로 간편하게 로그인하세요</p>

        <div className="flex gap-4">
          {['kakao_icon.png', 'google_icon.png', 'naver_icon.png'].map(src => (
            <button
              key={src}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"
              onClick={() => navigate('/signup/1')}
            >
              <img src={`/images/${src}`} className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* =========================================================
     ❷,❸,❹ 단계: 하위 컴포넌트 렌더링
  ========================================================= */
  switch (id) {
    case '1':
      return (
        <NicknameInput
          nickname={nickname}
          setNickname={setNickname}
          nicknameCheckResult={nicknameCheckResult}
          setNicknameCheckResult={setNicknameCheckResult}
          onNext={goStep2}
        />
      );

    case '2':
      return (
        <TeamSelection
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          onNext={goStep3} onPrev={function (): void {
            throw new Error('Function not implemented.');
          } } currentStep={0}        />
      );

    case '3':
      return <Completion onGoToMain={goHome} currentStep={0} />;  {/* 수정된 부분 */}

    /* 잘못된 파라미터면 간단히 안내 */
    default:
      return (
        <div className="flex items-center justify-center h-screen">
          잘못된 경로입니다.
        </div>
      );
  }
};

export default LoginPage;
