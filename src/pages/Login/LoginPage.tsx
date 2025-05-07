// src/pages/Login/LoginPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NickNameInput from './components/NickNameInput';
import TeamSelection from './components/TeamSelection';
import Completion from './components/Complection';

declare global {
  interface Window {
    Kakao: any;
  }
}

const LoginPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // /signup/:id
  const navigate = useNavigate();

  /* --------- 공통 상태 --------- */
  const [nickname, setNickname] = useState('');
  const [nicknameCheckResult, setNicknameCheckResult] =
    useState<'available' | 'duplicate' | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  /* 1) 페이지 최초 로드 시 한 번만 Kakao SDK init */
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
    }
  }, []);

  /* 2) 카카오 로그인 핸들러 */
  const kakaoLogin = () => {
    if (!window.Kakao) {
      return alert('카카오 SDK가 로드되지 않았습니다.');
    }

    window.Kakao.Auth.login({
      scope: 'profile_nickname,account_email',
      success: (authObj: any) => {
        fetch(`/api/kakao/user-info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: authObj.access_token,
          }),
        })
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((user: { token: string }) => {
            localStorage.setItem('jwtToken', user.token);
            navigate('/signup/1');
          })
          .catch(err => {
            console.error(err);
            alert('서버 처리 중 오류가 발생했습니다.');
          });
      },
      fail: (err: any) => {
        console.error(err);
        alert('카카오 로그인에 실패했습니다.');
      },
    });
  };

  /* 단계별 이후 처리 */
  const goStep2 = () => {
    if (nicknameCheckResult === 'available') navigate('/signup/2');
    else alert('닉네임 중복 체크를 완료해주세요!');
  };
  const goStep3 = () => {
    if (selectedTeam) navigate('/signup/3');
    else alert('응원팀을 선택해주세요!');
  };

  /* ❶ id가 없으면 SNS 로그인 기본 화면 */
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md mx-auto text-center">
          <p className="text-gray-600 mb-1">야구를 더 가까이, 더 즐겁게</p>
          <h1 className="text-4xl font-extrabold text-navy-800 mb-8">DUGOUT</h1>

          <div className="flex items-center w-full mb-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-4 text-gray-500 text-sm">
              SNS로 간편 로그인
            </span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <div className="w-full space-y-4">
            {/* 카카오톡 로그인 버튼 */}
            <button
              onClick={kakaoLogin}
              className="flex items-center justify-center h-12 w-full bg-[#FEE500] rounded-lg shadow hover:opacity-90 transition"
            >
              <img
                src="/images/kakao_login.png"
                alt="kakao"
                className="w-6 h-6 mr-2"
              />
              <span className="text-base font-medium text-gray-900">
                카카오톡으로 계속하기
              </span>
            </button>

            {/* 네이버 로그인 */}
            <button
              onClick={() => navigate('/signup/1')}
              className="flex items-center justify-center h-12 w-full bg-[#03C75A] rounded-lg shadow hover:opacity-90 transition"
            >
              <img
                src="/images/naver_login.png"
                alt="naver"
                className="w-6 h-6 mr-2"
              />
              <span className="text-base font-medium text-white">
                네이버로 계속하기
              </span>
            </button>

            {/* 구글 로그인 */}
            <button
              onClick={() => navigate('/signup/1')}
              className="flex items-center justify-center h-12 w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition"
            >
              <img
                src="/images/google_login.png"
                alt="google"
                className="w-6 h-6 mr-2"
              />
              <span className="text-base font-medium text-gray-800">
                구글로 계속하기
              </span>
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500 text-center px-2">
            계속 진행 시{' '}
            <button
              onClick={() => window.open('/terms', '_blank')}
              className="underline hover:text-gray-700"
            >
              이용약관
            </button>{' '}
            및{' '}
            <button
              onClick={() => window.open('/privacy', '_blank')}
              className="underline hover:text-gray-700"
            >
              개인정보처리방침
            </button>{' '}
            에 동의한 것으로 간주됩니다.
          </p>
        </div>
      </div>
    );
  }

  /* ❷~❹ 단계: 기존 하위 컴포넌트 렌더링 */
  switch (id) {
    case '1':
      return (
        <NickNameInput
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
          onNext={goStep3}
          onPrev={() => navigate('/signup/1')}
        />
      );
    case '3':
      return <Completion currentStep={3} onGoToMain={() => navigate('/')} />;
    default:
      return (
        <div className="flex items-center justify-center h-screen">
          잘못된 경로입니다.
        </div>
      );
  }
};

export default LoginPage;
