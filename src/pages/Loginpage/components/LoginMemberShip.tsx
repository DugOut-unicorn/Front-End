
const LoginMemberShip = () => {

  const mainLogo = "./assets/main_logo.png"
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* 로고 및 환영 메시지 */}
      <div className="text-center mb-8">
        <img src={mainLogo} alt="Dugout Logo" className="w-28 h-28 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">DUGOUT에 오신 것을 환영합니다!!</h1>
      </div>

      {/* SNS 로그인 버튼 */}
      <div className="flex justify-center gap-6 mb-6">
        <button className="w-61 h-59 bg-gray-300 rounded-full flex items-center justify-center shadow-md">
            ⚪️
        </button>
        <button className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center shadow-md">
            ⚪️
        </button>
        <button className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center shadow-md">
            ⚪️
        </button>
      </div>

      {/* 로그인 옵션 */}
      <div className="flex items-center gap-6 text-sm">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" className="mr-2 w-4 h-4" /> 로그인 상태 유지하기
        </label>
        <a href="/signup" className="text-blue-500 font-semibold">회원가입</a>
      </div>
    </div>
  );
};

export default LoginMemberShip;
