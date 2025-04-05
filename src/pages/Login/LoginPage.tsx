import { useParams } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/main_logo.png';

const LoginPage = () => {
  const { id } = useParams();

  // 회원가입 페이지 (id === '1')에서 사용할 상태 (이전 코드의 나머지 부분은 동일)
  const [nickname, setNickname] = useState('');
  const [nicknameCheckResult, setNicknameCheckResult] = useState<'available' | 'duplicate' | null>(null);

  const handleNicknameCheck = () => {
    if (nickname.trim() === '') return; // 입력값이 없으면 체크하지 않음
    // 예시 로직: 'test'라는 닉네임은 중복으로 간주
    if (nickname === 'test') {
      setNicknameCheckResult('duplicate');
    } else {
      setNicknameCheckResult('available');
    }
  };

  if (id === '1') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <h1 className="text-2xl font-bold mb-8">회원가입</h1>
        
        {/* 단계 표시 영역 with 연결 선 */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">

            {/* STEP 1 */}
            <div className="text-center">
              <div className="mb-1 font-semibold">STEP 1</div>
              <div>회원정보입력</div>
            </div>
            {/* 연결 선 */}
            <div className="w-8 h-px bg-gray-300 mx-4" />
            {/* STEP 2 */}
            <div className="text-center">
              <div className="mb-1 font-semibold">STEP 2</div>
              <div>응원팀선택</div>
            </div>
            {/* 연결 선 */}
            <div className="w-8 h-px bg-gray-300 mx-4" />
            {/* STEP 3 */}
            <div className="text-center">
              <div className="mb-1 font-semibold">STEP 3</div>
              <div>가입완료</div>
            </div>
          </div>
        </div>

        {/* 닉네임 입력 박스 */}
        <div className="w-full max-w-md bg-white p-6 shadow-md rounded mb-6">
          <label htmlFor="nickname" className="block mb-2 font-medium">
            닉네임
          </label>
          <div className="flex gap-2">
            <input
              id="nickname"
              type="text"
              placeholder="사용할 닉네임을 입력하세요"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setNicknameCheckResult(null); // 입력값 변경 시 결과 초기화
              }}
            />
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={handleNicknameCheck}
            >
              중복체크
            </button>
          </div>
          {/* 중복 체크 결과 메시지 */}
          {nicknameCheckResult === 'available' && (
            <div className="mt-2 text-sm text-green-500 text-center">
              사용 가능한 닉네임입니다.
            </div>
          )}
          {nicknameCheckResult === 'duplicate' && (
            <div className="mt-2 text-sm text-red-500 text-center">
              이미 사용 중인 닉네임입니다.
            </div>
          )}
          <div className="mt-4 text-sm text-center text-gray-500 leading-relaxed">
            닉네임 수정은 불가하오니 신중하게 결정해주세요
            <br />
            *닉네임 사용 중 복구는 안됩니다*
          </div>
        </div>

        {/* 다음 버튼 */}
        <button className="bg-black text-white w-full max-w-md py-3 rounded mb-2 hover:bg-gray-800">
          다음
        </button>

        {/* 하단 링크 */}
        <div className="text-center">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            이전으로 돌아가기
          </a>
        </div>
      </div>
    );
  } else if (id === '2') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>로그인(회원가입) 페이지 2</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img 
          src={logo}
          alt="Dugout Logo"
          className="rounded-full w-40 h-40 mb-6"
        />
        <h1 className="text-xl font-bold mb-20">
          DUGOUT에 오신 것을 환영합니다!!
        </h1>
        <p className="text-gray-500 mb-6">
          SNS 계정으로 간편하게 로그인하세요
        </p>
        <div className="flex gap-4 mb-4">
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <img src="/images/kakao_icon.png" alt="카카오 로그인" className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <img src="/images/google_icon.png" alt="구글 로그인" className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <img src="/images/naver_icon.png" alt="네이버 로그인" className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }
};

export default LoginPage;
