import NewsBanner from "../components/NewsBanner";
import PlayingGame from "../components/PlayingGame";
import LastResult from "../components/LastResult";
export default function TopBannerContainer() {
  return (
    <div className="mx-auto mb-5 w-full max-w-[1280px] px-8">
      <div className="flex w-full items-start justify-center gap-8">
        <NewsBanner />
        <PlayingGame />
      </div>
    </div>
  );
}
