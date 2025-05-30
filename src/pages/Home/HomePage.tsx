import NewMatchingList from "./components/NewMatchingList";
import MapWeatherContainer from "./container/MapWeatherContainer";
import TopBannerContainer from "./container/TopBannerContainer";
import { TeamOverviewContainer } from "./container/TeamOverviewContainer";
import EntryBanner from "./components/EntryBanner";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <EntryBanner />
      <TopBannerContainer />
      <div className="mt-30 mb-40 flex flex-col gap-20">
        <NewMatchingList />
        <TeamOverviewContainer />
        <MapWeatherContainer />
      </div>
    </div>
  );
}
