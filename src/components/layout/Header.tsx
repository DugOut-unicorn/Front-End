// src/components/layout/Header.tsx
import Logo from "../../assets/main_logo.png";
import Notification from "../../assets/notification_icon.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const isMatchingPage = location.pathname.startsWith("/matching");

  return (
    <div className="flex h-16 w-full flex-row items-center justify-between border-b border-[var(--divider-dv2)] bg-[var(--surface-1)] px-8">
      <div className="flex flex-row items-center gap-11">
        <Link to="/">
          <img src="/images/blue.png" alt="logo" />
        </Link>
        <div className="flex flex-row gap-10">
          <Link
            to="/matching"
            className={`t-body1 text-[var(--on-surface-grey1)] no-underline hover:text-[#007bff] ${
              location.pathname === "/matching" ? "font-bold text-black" : ""
            }`}
          >
            직관 매칭
          </Link>
          <Link
            to="/schedule"
            className={`t-body1 text-[var(--on-surface-grey1)] no-underline hover:text-[#007bff] ${
              location.pathname.startsWith("/schedule")
                ? "font-bold text-black"
                : ""
            }`}
          >
            경기 일정
          </Link>
          <Link
            to="/ranking"
            className={`t-body1 text-[var(--on-surface-grey1)] no-underline hover:text-[#007bff] ${
              location.pathname.startsWith("/ranking")
                ? "font-bold text-black"
                : ""
            }`}
          >
            순위/기록
          </Link>
        </div>
      </div>
      <div>
        <div className="ml-auto flex items-center gap-2.5">
          {isLogin ? (
            <>
              <a
                className="t-body1 cursor-pointer text-[var(--on-surface-grey1)] no-underline hover:text-[#007bff]"
                onClick={() => setIsLogin(false)}
              >
                로그아웃
              </a>
              <p className="text-xs">|</p>
              <Link
                to="/mypage"
                className="t-body1 cursor-pointer text-[var(--on-surface-grey1)] no-underline hover:text-[#007bff]"
              >
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
              className="t-body1 cursor-pointer text-[var(--on-surface-grey1)] no-underline hover:text-[#007bff]"
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
