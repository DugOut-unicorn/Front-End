// src/App.tsx
import React from "react";
import { createBrowserRouter, RouterProvider,useNavigate } from "react-router-dom";

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
      { index: true, element: <HomePage /> },

      // ─── 여기를 MatchingLayout 으로 바꿔 주세요 ─────────────────
      {
        path: "matching",
        element: <MatchingLayout />,
        children: [
          // /matching → 게임 리스트
          { index: true, element: <MatchingGameListPage /> },
          // /matching/chats → 채팅방 목록
          { path: "chats", element: <MatchingChatListPage /> },
          // /matching/list/:date/:team → 매칭글 리스트
          { path: "list/:date/:team", element: <MatchingListPage /> },
          // /matching/articles/:id → 단일 매칭글
          { path: "articles/:id", element: <MatchingArticlePage /> },
          // /matching/write → 매칭글 작성
          { path: "write", element: <MatchingWritePage /> },
        ],
      },
      // ──────────────────────────────────────────────────────────

      { path: "schedule", element: <SchedulePage /> },
      { path: "ranking", element: <RankingPage /> },
      { path: "ranking/:year", element: <RankingPage /> },
      { path: "team/:teamName", element: <TeamInfoPage /> },
      { path: "playerprofile/:playerId", element: <PlayerProfilePage /> },

      {
        path: "mypage",
        element: <MyPage />,
        children: [
          { index: true, element: <Profile /> },
          { path: "info", element: <Info /> },
          { path: "edit", element: <ProfileEdit /> },
        ],
      },

      { path: "login", element: <LoginPage /> },
      { path: "login/:id", element: <LoginPage /> },
      { path: "signup/3", element: <SignupStep3 /> },
      { path: "signup/:id", element: <LoginPage /> },
    ],
  },
]);

export default function App() {
  return (
    <div className="bg-[var(--surface-2)]">
      <RouterProvider router={router} />
    </div>
  );
}
