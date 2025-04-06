import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function MyPage() {
  return (
    <div className="max-w-[1080px] mx-auto p-5 bg-white">
      <div className="flex min-h-screen font-sans">
        {/* 왼쪽 사이드바 */}
        <aside className="w-[200px] p-5">
          <h2 className="text-2xl mb-[10px] font-bold">마이페이지</h2>
          <hr className="mb-[1px] border-2 border-black" />
          <nav>
            <ul className="list-none p-0 m-0">
              <li className="mb-5">
                <NavLink
                  to="."
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "no-underline text-black font-bold"
                      : "no-underline text-gray-500 font-bold"
                  }
                >
                  내 정보
                </NavLink>
              </li>
              <li className="mb-5">
                <NavLink
                  to="info"
                  className={({ isActive }) =>
                    isActive
                      ? "no-underline text-black font-bold"
                      : "no-underline text-gray-500"
                  }
                >
                  개인정보
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="edit"
                  className={({ isActive }) =>
                    isActive
                      ? "no-underline text-black font-bold"
                      : "no-underline text-gray-500"
                  }
                >
                  프로필 편집
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        {/* 오른쪽 메인 영역 */}
        <main className="flex-1 p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MyPage;
