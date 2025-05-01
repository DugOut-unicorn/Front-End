import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RankingPage from "./pages/Ranking/RankingPage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/Login/LoginPage";
import Layout from "./components/layout/Layout";
import TeamInfoPage from "./pages/TeamInfoPage";
import Profile from "./pages/Profile/components/Profile";

import MyPage from "./pages/Profile/MyPage"; // 공통 레이아웃 (사이드바 + Outlet)
import Info from "./pages/Profile/components/Info";
import ProfileEdit from "./pages/Profile/components/ProfileEdit";
import PlayerProfilePage from "./pages/playerProfile/PlayerProfilePage";
import MatchingWritePage from "./pages/Matching/MatchingWritePage";
import MatchingListPage from "./pages/Matching/MatchingListPage";
import MatchingGameListPage from "./pages/Matching/MatchingGameListPage";
import MatchingArticlePage from "./pages/Matching/MatchingArticlePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "matching",
        element: <MatchingGameListPage />,
        children: [
          {
            index: true, // 기본 자식 라우트로 MatchingGameList를 표시
            path: "gamelist/:date",
            element: <MatchingGameListPage />,
          },
        ],
      },
      {
        path: "article/:id",
        element: <MatchingArticlePage />,
      },
      {
        path: "write",
        element: <MatchingWritePage />,
      },
      {
        path: "list/:date/:team",
        element: <MatchingListPage />,
      },
      {
        path: "schedule",
        element: <SchedulePage />,
      },
      { path: "login", element: <LoginPage /> }, // SNS 기본
      { path: "login/:id", element: <LoginPage /> }, // 예전 경로(필요하면 유지)
      { path: "signup/:id", element: <LoginPage /> }, // ★ 새로 추가 ★
      {
        path: "mypage",
        element: <MyPage />,
        children: [
          {
            index: true, // 기본 자식 라우트로 MyInfo를 표시
            element: <Profile />,
          },
          {
            path: "info",
            element: <Info />,
          },
          {
            path: "edit",
            element: <ProfileEdit />,
          },
        ],
      },
      { path: "ranking", element: <RankingPage /> },
      { path: "ranking/:year", element: <RankingPage /> },
      { path: "team/:teamName", element: <TeamInfoPage /> },
      { path: "playerprofile/:playerId", element: <PlayerProfilePage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
