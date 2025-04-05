// src/pages/Home.tsx
import Layout from "../../components/layout/Layout";
import NewsBanner from "./components/NewsBanner";
import PlayingGame from "./components/PlayingGame";
import Ranking from "./components/Ranking";
import MyteamSchedule from "./components/MyteamSchedule";
export default function Home() {
  return (
    <Layout>
      <NewsBanner />
      <PlayingGame />
      <Ranking />
      <MyteamSchedule />
    </Layout>
  );
}
