// src/pages/Profile/components/TeamSelect.tsx

interface TeamSelectProps {
  team: string;
  teams: string[];
  onChange: (value: string) => void;
}

export default function TeamSelect({
  team,
  teams,
  onChange,
}: TeamSelectProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor="team"
        className="block text-sm font-medium text-gray-700 lg:text-base"
      >
        응원팀
      </label>
      <select
        id="team"
        value={team}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 lg:px-4 lg:py-3 lg:text-base"
      >
        {teams.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
