// src/pages/Matching/MatchingLayout.tsx
import { Outlet } from "react-router-dom";

export default function MatchingLayout() {
  return (
    <>
      {/* 자식 라우트 페이지만 렌더 */}
      <Outlet />
    </>
  );
}
