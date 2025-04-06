// import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MatchingPage from "./pages/MatchingPage";
import RankingPage from "./pages/Ranking/RankingPage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/Login/LoginPage";
import Layout from "./components/layout/Layout";
import TeamInfoPage from "./pages/TeamInfoPage";

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
        path: `ranking`,
        element: <RankingPage />,
      },
      {
        path: "ranking/:year",
        element: <RankingPage />,
      },
      {
        path: "team/:teamName",
        element: <TeamInfoPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
