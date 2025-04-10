import CareerStatsTable from "./components/CareerStateTable";
import MonthlyNavigation from "./components/MonthlyNavigation";
import MonthlyStats from "./components/MonthState";
import PlayerInfoCard from "./components/playerInfoCard";


export default function PlayerProfilePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <PlayerInfoCard />
      <MonthlyNavigation />
      <MonthlyStats />
      <hr className="my-6 border-gray-300" />
      <h2 className="text-lg font-semibold mb-2">통산기록</h2>
      <CareerStatsTable />
    </div>
  );
}
