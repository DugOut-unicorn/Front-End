// src/pages/Profile/MyPage.tsx
import { Outlet } from "react-router-dom";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="w-full px-8 py-10">
        <Outlet />
      </div>
    </div>
  );
}
