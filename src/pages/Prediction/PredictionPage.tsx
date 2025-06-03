import LivePrediction from "./components/LivePrediction";
import WinnerPrediction from "./components/WinnerPrediction";

export default function PredictionPage() {
  return (
    <div className="mx-auto flex max-w-[1080px] flex-row items-center gap-8 px-4 py-8">
      <LivePrediction />
      <WinnerPrediction />
    </div>
  );
}
