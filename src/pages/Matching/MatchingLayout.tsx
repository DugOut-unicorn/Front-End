// src/pages/Matching/MatchingLayout.tsx
import { Outlet } from "react-router-dom";

export default function MatchingLayout() {
  return (
    <div className="w-220">
      <Outlet />
    </div>
  );
}
