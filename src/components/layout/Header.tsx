import Logo from "../../assets/main_logo.png";
import Notification from "../../assets/notification_icon.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const isMatchingPage = location.pathname.startsWith("/matching");

  return (
    <div className="font-kbo_bold w-full pt-2.5 text-black">
      <div className="mx-auto flex w-full max-w-[1080px] items-center">
        <div className="flex w-[200px] items-center gap-5">
          <img className="h-10 w-10 rounded-full" src={Logo} alt="logo" />
          <Link to="/" className="text-xl no-underline">
            Dugout
          </Link>
        </div>
        <div className="flex w-[650px] items-center gap-[50px] pl-5">
          <Link
            to="/matching"
            className="text-base no-underline hover:text-[#007bff]"
          >
            직관 매칭
          </Link>
          <Link
            to="/schedule"
            className="text-base no-underline hover:text-[#007bff]"
          >
            경기 일정
          </Link>
          <Link
            to="/ranking"
            className="text-base no-underline hover:text-[#007bff]"
          >
            순위/기록
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          {isLogin ? (
            <>
              <a
                className="text-xs no-underline hover:text-[#007bff] cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                로그아웃
              </a>
              <p className="text-xs">|</p>
              <Link to="/Mypage" className="text-xs no-underline hover:text-[#007bff]">
                마이페이지
              </Link>
              <p className="text-xs">|</p>
              <img
                className="h-5 w-5 cursor-pointer"
                src={Notification}
                alt="notification"
              />
            </>
          ) : (
            <Link
              to="/login"
              className="text-xs no-underline hover:text-[#007bff]"
            >
              로그인
            </Link>
          )}
        </div>
      </div>

    {/* 하위 탭: 매칭 관련 서브메뉴 */}
    {isMatchingPage && (
      <div className="border-t border-b border-gray-200">
        <div className="mx-auto max-w-[780px] flex gap-4 text-sm px-4 py-2">
          <Link to="/matching/articles" className="hover:underline">
            직관 매칭글
          </Link>
          <Link to="/matching/chats" className="hover:underline">
            채팅방 목록
          </Link>
        </div>
      </div>
    )}

    </div>
  );
};

export default Header;
