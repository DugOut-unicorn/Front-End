import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MatchingPage from "./pages/MatchingPage";
import RankingPage from "./pages/Ranking/RankingPage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/Login/LoginPage";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile/components/Profile";

// Profile 관련 컴포넌트
import MyPage from "./pages/Profile/MyPage"; // 공통 레이아웃 (사이드바 + Outlet)
import Info from "./pages/Profile/components/Info";
import ProfileEdit from "./pages/Profile/components/ProfileEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "login/:id",
        element: <LoginPage />,
      },
      {
        path: "matching",
        element: <MatchingPage />,
      },
      {
        path: "schedule",
        element: <SchedulePage />,
      },
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
            element: <Info/>,
          },
          {
            path: "edit",
            element: <ProfileEdit />,
          },
        ],
      },
      {
        path: "ranking",
        element: <RankingPage />,
      },
      {
        path: "ranking/:year",
        element: <RankingPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
