// src/App.tsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RankingPage from "./pages/Ranking/RankingPage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/Login/LoginPage";
import TeamInfoPage from "./pages/TeamInfoPage";
import PlayerProfilePage from "./pages/playerProfile/PlayerProfilePage";

// 프로필(MyPage)
import MyPage from "./pages/Profile/MyPage";
import Profile from "./pages/Profile/components/Profile";
import Info from "./pages/Profile/components/Info";
import ProfileEdit from "./pages/Profile/components/ProfileEdit";

// 매칭
import MatchingLayout from "./pages/Matching/MatchingLayout";
import MatchingGameListPage from "./pages/Matching/MatchingGameListPage";
import MatchingChatListPage from "./pages/Matching/MatchingChatListPage";
import MatchingListPage from "./pages/Matching/MatchingListPage";
import MatchingArticlePage from "./pages/Matching/MatchingArticlePage";
import MatchingWritePage from "./pages/Matching/MatchingWritePage";

// SignupStep3: Home + Completion
import Completion from "./pages/Login/components/Complection";
function SignupStep3() {
  const navigate = useNavigate();
  return (
    <>
      <HomePage />
      <Completion onGoToMain={() => navigate("/")} />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      // 홈
      { index: true, element: <HomePage /> },

      // 매칭
      {
        path: "matching",
        element: <MatchingLayout />,
        children: [
          { index: true, element: <MatchingGameListPage /> },
          { path: "chats", element: <MatchingChatListPage /> },
          { path: "list/:date/:team", element: <MatchingListPage /> },
          { path: "articles/:id", element: <MatchingArticlePage /> },
          { path: "write", element: <MatchingWritePage /> },
        ],
      },

      // 기타 페이지
      { path: "schedule", element: <SchedulePage /> },
      { path: "ranking", element: <RankingPage /> },
      { path: "ranking/:year", element: <RankingPage /> },
      { path: "team/:teamName", element: <TeamInfoPage /> },
      { path: "playerprofile/:playerId", element: <PlayerProfilePage /> },

      // 프로필(MyPage)
      {
        path: "mypage",
        element: <MyPage />,
        children: [
          { index: true, element: <Profile /> },
          { path: "info", element: <Info /> },
          { path: "edit", element: <ProfileEdit /> },
        ],
      },

      // 로그인 & 회원가입
      // signup/3은 별도 처리 (Step3)
      { path: "signup/3", element: <SignupStep3 /> },
      // login과 signup은 id 파라미터 optional
      { path: "login/:id?", element: <LoginPage /> },
      { path: "signup/:id?", element: <LoginPage /> },
    ],
  },
]);

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--surface-2)]">
      <RouterProvider router={router} />
    </div>
  );
}
