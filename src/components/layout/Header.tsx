import Logo from "../../assets/main_logo.png";
import Notification from "../../assets/notification_icon.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

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
                className="text-xs no-underline hover:text-[#007bff]"
                onClick={() => setIsLogin(false)}
              >
                로그아웃
              </a>
              <p className="text-xs">|</p>
              <a className="text-xs no-underline hover:text-[#007bff]">
                마이페이지
              </a>
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
    </div>
  );
};

export default Header;
