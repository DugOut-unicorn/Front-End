// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout              from "./components/layout/Layout";
import NotFoundPage        from "./pages/NotFoundPage";

import HomePage            from "./pages/Home/HomePage";
import LoginPage           from "./pages/Login/LoginPage";
import MatchingWritePage   from "./pages/MatchingWrite/MatchingWritePage";
import SchedulePage        from "./pages/SchedulePage";
import RankingPage         from "./pages/Ranking/RankingPage";
import TeamInfoPage        from "./pages/TeamInfoPage";
import PlayerProfilePage   from "./pages/playerProfile/PlayerProfilePage";

/* 마이페이지 관련 */
import MyPage              from "./pages/Profile/MyPage";
import Profile             from "./pages/Profile/components/Profile";
import Info                from "./pages/Profile/components/Info";
import ProfileEdit         from "./pages/Profile/components/ProfileEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [

      { index: true,
        element: <HomePage /> 
      },
      { path: "login",     element: <LoginPage /> },      // SNS 기본
      { path: "login/:id", element: <LoginPage /> },      // 예전 경로(필요하면 유지)
      { path: "signup/:id", element: <LoginPage /> },     // ★ 새로 추가 ★

      { path: "matching", 
        element: <MatchingWritePage /> 
      },
      { path: "schedule",
        element: <SchedulePage /> 
      },
      {
        path: "mypage",
        element: <MyPage />,
        children: [
          { index: true, element: <Profile /> },
          { path: "info", element: <Info /> },
          { path: "edit", element: <ProfileEdit /> },
        ],
      },
      { path: "ranking",
        element: <RankingPage /> 
      },
      { path: "ranking/:year",
        element: <RankingPage />
      },
      { path: "team/:teamName",
        element: <TeamInfoPage /> 
      },
      { path: "playerprofile/:playerId",
        element: <PlayerProfilePage /> 
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
