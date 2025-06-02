// src/App.tsx

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
import MatchingGameListPage from "./pages/Matching/MatchingGameListPage";
import MatchingChatListPage from "./pages/Matching/MatchingChatListPage";
import MatchingListPage from "./pages/Matching/MatchingListPage";
import MatchingArticlePage from "./pages/Matching/MatchingArticlePage";
import MatchingWritePage from "./pages/Matching/MatchingWritePage";

// SignupStep3: Home + Completion
import Completion from "./pages/Login/components/Complection";
import SidebarLayout from "./components/layout/SidebarLayout";

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
        element: <SidebarLayout />,
        children: [
          // 1 게임 리스트 진입
          { index: true, element: <MatchingGameListPage /> },

          // 2 날짜/팀/게임ID 파라미터를 받는 매칭 글 리스트
          //    예시 URL: /matching/list/2023-06-19/lg/1234
          {
            path: "list/:date/:team/:gameIdx",
            element: <MatchingListPage />,
          },

          // 채팅 리스트
          { path: "chats", element: <MatchingChatListPage /> },

          // 게시글 상세 → URL 파라미터 이름을 :postIdx로 변경
          { path: "articles/:postIdx", element: <MatchingArticlePage /> },
        ],
      },

      // 매칭 글쓰기
      { path: "matching/write", element: <MatchingWritePage /> },

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
      { path: "signup/3", element: <SignupStep3 /> },
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
