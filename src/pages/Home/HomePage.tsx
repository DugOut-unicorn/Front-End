// src/pages/Home.tsx
import NewsBanner from "./components/NewsBanner";
import PlayingGame from "./components/PlayingGame";
import Ranking from "./components/Ranking";
import MyteamSchedule from "./components/MyteamSchedule";

export default function Home() {
  return (
    <>
      <NewsBanner />
      <PlayingGame />
      <Ranking />
      <MyteamSchedule />
    </>
  );
}
