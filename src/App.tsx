import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MatchingPage from "./pages/MatchingPage";
import RankingPage from "./pages/RankingPage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/Login/LoginPage";
import Layout from "./components/layout/Layout";

// Profile 관련 컴포넌트
import MyPage from "./pages/Profile/MyPage"; // 공통 레이아웃 (사이드바 + Outlet)
import MyInfo from "./pages/Profile/components/MyInfo";
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
        path: "ranking",
        element: <RankingPage />,
      },
      {
        path: "mypage",
        element: <MyPage />,
        children: [
          {
            index: true, // 기본 자식 라우트로 MyInfo를 표시
            element: <Info />,
          },
          {
            path: "info",
            element: <MyInfo />,
          },
          {
            path: "edit",
            element: <ProfileEdit />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
