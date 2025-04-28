import { useParams } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/main_logo.png';

const LoginPage = () => {
  const { id } = useParams();

  // STEP 1에서 사용하던 닉네임 상태 (예시)
  const [nickname, setNickname] = useState('');
  const [nicknameCheckResult, setNicknameCheckResult] = useState<'available' | 'duplicate' | null>(null);

  const handleNicknameCheck = () => {
    if (nickname.trim() === '') return;
    // 예시 로직: 'test'라는 닉네임은 중복
    if (nickname === 'test') {
      setNicknameCheckResult('duplicate');
    } else {
      setNicknameCheckResult('available');
    }
  };
  // ===============================
  // STEP 1: 회원정보입력
  // ===============================
  if (id === '1') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <h1 className="text-2xl font-bold mb-8">회원가입</h1>
        
        {/* 단계 표시 영역 */}
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
  }
  // ===============================
  // STEP 2: 응원팀선택 (이미지 참고)
  // ===============================
  else if (id === '2') {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-2xl font-bold mb-8">회원가입</h1>
            {/* 단계 표시 영역 */}
            <div className="flex items-center justify-center mb-6">
                <div className="flex items-center">
                {/* STEP 1 */}
                <div className="text-center">
                    <div className="mb-1 font-semibold">STEP 1</div>
                    <div>회원정보입력</div>
                </div>
                {/* 연결 선 */}
                <div className="w-8 h-px bg-gray-300 mx-4" />
                {/* STEP 2 (현재 단계 강조) */}
                <div className="text-center">
                    <div className="mb-1 font-semibold text-red-500">STEP 2</div>
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

            <h2 className="text-lg font-semibold mb-4">응원하는 팀을 선택해주세요!</h2>

            <div className='bg-gray-100 p-6 shadow-md rounded mb-6'>
                {/* 첫 번째 행: 4팀 */}
                <div className="grid grid-cols-4 gap-6 mb-6 w-full max-w-md">
                    {/* 팀 1: 두산 베어스 */}
                    <div className="flex flex-col items-center bg-white">
                        <img src="/images/dusan_emb.png" alt="두산 베어스" className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm">두산 베어스</p>
                    </div>
                    {/* 팀 2: LG 트윈스 */}
                    <div className="flex flex-col items-center bg-white">
                        <img src="/images/lg_emb.png" alt="LG 트윈스" className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm">LG 트윈스</p>
                    </div>
                    {/* 팀 3: 키움 히어로즈 */}
                    <div className="flex flex-col items-center bg-white">
                        <img src="/images/kiwoom_emb.png" alt="키움 히어로즈" className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm">키움 히어로즈</p>
                    </div>
                    {/* 팀 4: 삼성 라이온즈 */}
                    <div className="flex flex-col items-center bg-white">
                        <img src="/images/samsung_emb.png" alt="삼성 라이온즈" className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm">삼성 라이온즈</p>
                    </div>
                </div>

                {/* 두 번째 행: 4팀 */}
                <div className="grid grid-cols-4 gap-6 mb-6 w-full max-w-md">
                    {/* 팀 5: KT 위즈 */}
                    <div className="flex flex-col items-center bg-white">
                        <img src="/images/kt_emb.png" alt="KT 위즈" className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm">KT 위즈</p>
                    </div>
                    {/* 팀 6: SSG 랜더스 */}
                    <div className="flex flex-col items-center bg-white">
                        <img src="/images/ssg_emb.png" alt="SSG 랜더스" className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm">SSG 랜더스</p>
                    </div>
                    {/* 팀 7: 한화 이글스 */}
                    <div className="flex flex-col items-center bg-white">
                        <img src="/images/hanhwa_emb.png" alt="한화 이글스" className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm">한화 이글스</p>
                    </div>
                    {/* 팀 8: 롯데 자이언츠 */}
                    <div className="flex flex-col items-center bg-white">
                        <img src="/images/lotte_emb.png" alt="롯데 자이언츠" className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm">롯데 자이언츠</p>
                    </div>
                </div>

                {/* 세 번째 행: 2팀 */}
                <div className="grid grid-cols-4 gap-6 mb-6 w-full max-w-md">
                    {/* 빈 공간 */}
                    <div className="flex flex-col items-center bg-gray-100"></div>
                    {/* 팀 9: NC 다이노스 */}
                    <div className="flex flex-col items-center bg-white">
                        <img src="/images/nc_emb.png" alt="NC 다이노스" className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm">NC 다이노스</p>
                    </div>
                    {/* 팀 10: KIA 타이거즈 */}
                    <div className="flex flex-col items-center bg-white">
                        <img src="/images/kia_emb.png" alt="KIA 타이거즈" className="w-20 h-20 object-contain" />
                        <p className="mt-2 text-sm">KIA 타이거즈</p>
                    </div>
                    {/* 빈 공간 */}
                    <div className="flex flex-col items-center bg-gray-100"></div>
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
  }
    // ===============================
  // STEP 2: 응원팀선택 (이미지 참고)
  // ===============================
  else if (id === '3') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <h1 className="text-2xl font-bold mb-8">회원가입</h1>
  
        {/* 단계 표시 영역 */}
        <div className="flex items-center justify-center mb-20">
          <div className="flex items-center">
        
            {/* STEP 1 */}
            <div className="text-center">
              <div className="mb-1 font-semibold">STEP 1</div>
              <div>회원정보입력</div>
            </div>
            <div className="w-8 h-px bg-gray-300 mx-4" />
            {/* STEP 2 */}
            <div className="text-center">
              <div className="mb-1 font-semibold">STEP 2</div>
              <div>응원팀선택</div>
            </div>
            <div className="w-8 h-px bg-gray-300 mx-4" />
            {/* STEP 3 (현재 단계 강조) */}
            <div className="text-center">
              <div className="mb-1 font-semibold text-red-500">STEP 3</div>
              <div>가입완료</div>
            </div>
          </div>
        </div>
  
        {/* 완료 안내 문구 */}
        <h2 className="text-lg font-semibold mb-6">
          회원가입이 완료되었습니다.
        </h2>
  
        {/* 메인 페이지로 가기 버튼 (예시) */}
        <button className="bg-black text-white w-full max-w-md py-3 rounded mb-2 hover:bg-gray-800">
          메인 페이지로 가기
        </button>
      </div>
    );
  }
  
  // ===============================
  // 기본 로그인 페이지
  // ===============================
  else {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src={logo}
          alt="Dugout Logo"
          className="rounded-full w-40 h-40 mb-6"
        />
        <h1 className="text-xl font-bold mb-20">
          DUGOUT에 오신 것을 환영합니다!!!
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
