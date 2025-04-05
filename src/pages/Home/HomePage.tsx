import LastResult from "./components/LastResult";
import NewMatchingList from "./components/NewMatchingList";
import NewsBanner from "./components/NewsBanner";
import PlayingGame from "./components/PlayingGame";
import TeamSection from "./components/TeamSection";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <>
      <NewsBanner />
      <PlayingGame />
      <TeamSection />
      <LastResult />
      <NewMatchingList />
      <Weather />
    </>
  );
}
