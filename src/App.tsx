import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import MatchingPage from "./pages/MatchingPage";
import RankingPage from "./pages/RankingPage";
import SchedulePage from "./pages/SchedulePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
