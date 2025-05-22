import CareerStatsTable from "./components/CareerStateTable";
import MonthlyNavigation from "./components/MonthlyNavigation";
import MonthlyStats from "./components/MonthState";
import PlayerInfoCard from "./components/PlayerInfoCard";

export default function PlayerProfilePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <PlayerInfoCard />
      <MonthlyNavigation />
      <MonthlyStats />
      <hr className="my-6 border-gray-300" />
      <h2 className="mb-2 text-lg font-semibold">통산기록</h2>
      <CareerStatsTable />
    </div>
  );
}
