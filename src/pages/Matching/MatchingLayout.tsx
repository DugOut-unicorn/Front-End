// src/pages/Matching/MatchingLayout.tsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function MatchingLayout() {
  const { pathname } = useLocation();
  const base = "/matching";

  return (
    <>


      {/* 자식 라우트 페이지만 렌더 */}
      <Outlet />
    </>
  );
}
