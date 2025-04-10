import LastResult from "./components/LastResult";
import NewMatchingList from "./components/NewMatchingList";
import NewsBanner from "./components/NewsBanner";
import PlayingGame from "./components/PlayingGame";
import TeamSection from "./components/TeamSection";
import MapWeatherContainer from "./container/MapWeatherContainer";

export default function Home() {
  return (
    <>
      <NewsBanner />
      <PlayingGame />
      <TeamSection />
      <LastResult />
      <NewMatchingList />
      <MapWeatherContainer />
    </>
  );
}
