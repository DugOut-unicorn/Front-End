interface GameResultCardProps {
  homeTeam: {
    name: string;
    score: number;
    logo: string;
  };
  awayTeam: {
    name: string;
    score: number;
    logo: string;
  };
}

export default function GameResultCard({
  homeTeam,
  awayTeam,
}: GameResultCardProps) {
  return (
    <div className="rounded-2xl bg-gray-100 p-4">
      <div className="mb-2 text-lg font-bold">경기 종료</div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={homeTeam.logo} alt={homeTeam.name} className="h-8 w-8" />
          <span className="text-lg">{homeTeam.name}</span>
        </div>
        <span className="text-xl font-bold">{homeTeam.score}</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={awayTeam.logo} alt={awayTeam.name} className="h-8 w-8" />
          <span className="text-lg">{awayTeam.name}</span>
        </div>
        <span className="text-xl font-bold">{awayTeam.score}</span>
      </div>
    </div>
  );
}
