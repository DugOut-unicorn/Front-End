import NewsBanner from "../components/NewsBanner";
import PlayingGame from "../components/PlayingGame";
export default function TopBannerContainer() {
  return (
    <div className="flex w-[1280px] flex-col gap-8 px-8 xl:flex-row">
      <NewsBanner />
      <PlayingGame />
    </div>
  );
}
