// src/components/layout/Header.tsx

import React from "react";
import Logo from "/images/blue.png";
import { Link, useLocation } from "react-router-dom";
import { Bell, User2 } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  // 매 렌더 시 localStorage를 바로 확인해서 로그인 여부 판단
  const isLogin = Boolean(localStorage.getItem("jwtToken"));

  const handleLogout = () => {
    // 토큰 삭제
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userIdx");
    // 새로고침해서 헤더 리렌더링
    window.location.reload();
  };

  return (
    <div className="flex h-16 w-full items-center justify-between bg-[var(--surface-1)] px-8">
      {/* 로고 + 네비게이션 */}
      <div className="flex items-center gap-11">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="flex gap-10">
          <Link
            to="/matching"
            className={`t-body1 no-underline hover:text-[#007bff] ${
              location.pathname === "/matching"
                ? "font-bold text-black"
                : "text-[var(--on-surface-grey1)]"
            }`}
          >
            직관 매칭
          </Link>
          <Link
            to="/schedule"
            className={`t-body1 no-underline hover:text-[#007bff] ${
              location.pathname.startsWith("/schedule")
                ? "font-bold text-black"
                : "text-[var(--on-surface-grey1)]"
            }`}
          >
            경기 일정
          </Link>
          <Link
            to="/ranking"
            className={`t-body1 no-underline hover:text-[#007bff] ${
              location.pathname.startsWith("/ranking")
                ? "font-bold text-black"
                : "text-[var(--on-surface-grey1)]"
            }`}
          >
            순위/기록
          </Link>
        </div>
      </div>

      {/* 로그인 전/후 UI 분기 */}
      <div className="flex items-center gap-5">
        {isLogin ? (
          <>
            <button
              onClick={handleLogout}
              className="t-button2 rounded-lg border border-[var(--divider-dv2)] p-3 text-[var(--on-surface-grey1)] hover:text-[#007bff]"
            >
              로그아웃
            </button>
            <Bell className="cursor-pointer" />
            <Link
              to="/mypage"
              className="t-body1 text-[var(--on-surface-grey1)] no-underline hover:text-[#007bff]"
            >
              <User2 />
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className="t-body1 text-[var(--on-surface-grey1)] no-underline hover:text-[#007bff]"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
