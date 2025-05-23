// src/pages/Profile/MyPage.tsx
import { Outlet } from "react-router-dom";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ───── 컨테이너 (공통 레이아웃) ───── */}
      <div className="mx-auto max-w-4xl px-8 py-10">
        {/* 자식 라우트(Profile / Info / ProfileEdit)가 이 자리에 그려집니다 */}
        <Outlet />
      </div>
    </div>
  );
}
