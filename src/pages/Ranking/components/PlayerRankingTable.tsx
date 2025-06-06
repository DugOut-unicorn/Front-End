import { useState, useEffect } from "react";
import { rankingApi } from "../../../api/ranking/apis";
import { pitcherRanks } from "../../../types/rank";
import { batterRanks } from "../../../types/rank";

interface PlayerCardData {
  playerName: string;
  backNumber: number;
  playerImageUrl: string;
  value: string | number;
}

interface RankingCardProps {
  title: string;
  loading: boolean;
  data: PlayerCardData[];
}

function RankingCard({ title, loading, data }: RankingCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="mb-2 text-base font-semibold text-blue-500">{title}</div>
      {loading ? (
        <div className="text-center">로딩 중...</div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-400">데이터 없음</div>
      ) : (
        <>
          {/* 1위 선수 */}
          <div className="mb-3 flex items-center gap-3">
            <img
              src={data[0]?.playerImageUrl}
              alt={data[0]?.playerName}
              className="h-12 w-12 rounded-full border border-gray-200 object-cover"
            />
            <span className="t-body1 text-blue-900">1</span>
            <span className="t-body1 text-gray-900">{data[0]?.playerName}</span>
            <span className="t-body1 ml-auto text-gray-800">
              {data[0]?.value}
            </span>
          </div>
          <hr className="my-2" />
          {/* 2~3위 선수 */}
          {data.slice(1, 3).map((player, i) => (
            <div key={i + 2} className="flex items-center py-1">
              <span className="w-6 text-lg font-bold text-blue-900">
                {i + 2}
              </span>
              <span className="flex-1 text-base text-gray-800">
                {player.playerName}
              </span>
              <span className="text-base font-medium text-gray-700">
                {player.value}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function PlayerRankingTable() {
  const [winData, setWinData] = useState<PlayerCardData[]>([]);
  const [eraData, setEraData] = useState<PlayerCardData[]>([]);
  const [soData, setSoData] = useState<PlayerCardData[]>([]);
  const [svData, setSvData] = useState<PlayerCardData[]>([]);
  const [hitData, setHitData] = useState<PlayerCardData[]>([]);
  const [hrData, setHrData] = useState<PlayerCardData[]>([]);
  const [rbiData, setRbiData] = useState<PlayerCardData[]>([]);
  const [avgData, setAvgData] = useState<PlayerCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<"투수" | "타자">(
    "투수",
  );

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        if (selectedCategory === "투수") {
          const [win, era, so, sv] = await Promise.all([
            rankingApi.getRankPitcherWinRate(),
            rankingApi.getRankPitcherEra(),
            rankingApi.getRankPitcherSo(),
            rankingApi.getRankPitcherSv(),
          ]);
          setWinData(
            win.slice(0, 3).map((item: any) => ({
              playerName: item.playerName,
              backNumber: item.backNumber,
              playerImageUrl: item.playerImageUrl,
              value: item.wpct ? Number(item.wpct).toFixed(3) : "-",
            })),
          );
          setEraData(
            era.slice(0, 3).map((item: any) => ({
              playerName: item.playerName,
              backNumber: item.backNumber,
              playerImageUrl: item.playerImageUrl,
              value: item.era ?? "-",
            })),
          );
          setSoData(
            so.slice(0, 3).map((item: any) => ({
              playerName: item.playerName,
              backNumber: item.backNumber,
              playerImageUrl: item.playerImageUrl,
              value: item.so ?? "-",
            })),
          );
          setSvData(
            sv.slice(0, 3).map((item: any) => ({
              playerName: item.playerName,
              backNumber: item.backNumber,
              playerImageUrl: item.playerImageUrl,
              value: item.sv ?? "-",
            })),
          );
        } else {
          const [hit, hr, rbi, avg] = await Promise.all([
            rankingApi.getRankPlayerHit(),
            rankingApi.getRankPlayerHR(),
            rankingApi.getRankPlayerRBI(),
            rankingApi.getRankPlayerAVG(),
          ]);
          setHitData(
            hit.slice(0, 3).map((item: any) => ({
              playerName: item.playerName,
              backNumber: item.backNumber,
              playerImageUrl: item.playerImageUrl,
              value: item.hit ?? "-",
            })),
          );
          setHrData(
            hr.slice(0, 3).map((item: any) => ({
              playerName: item.playerName,
              backNumber: item.backNumber,
              playerImageUrl: item.playerImageUrl,
              value: item.hr ?? "-",
            })),
          );
          setRbiData(
            rbi.slice(0, 3).map((item: any) => ({
              playerName: item.playerName,
              backNumber: item.backNumber,
              playerImageUrl: item.playerImageUrl,
              value: item.rbi ?? "-",
            })),
          );
          setAvgData(
            avg.slice(0, 3).map((item: any) => ({
              playerName: item.playerName,
              backNumber: item.backNumber,
              playerImageUrl: item.playerImageUrl,
              value: item.avg ? Number(item.avg).toFixed(3) : "-",
            })),
          );
        }
      } catch (e) {
        if (selectedCategory === "투수") {
          setWinData([]);
          setEraData([]);
          setSoData([]);
          setSvData([]);
        } else {
          setHitData([]);
          setHrData([]);
          setRbiData([]);
          setAvgData([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [selectedCategory]);

  return (
    <div>
      <div className="mt-4 mb-4 flex gap-2">
        <button
          className={`rounded-full px-4 py-1 ${
            selectedCategory === "투수"
              ? "bg-blue-900 text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setSelectedCategory("투수")}
        >
          투수
        </button>
        <button
          className={`rounded-full px-4 py-1 ${
            selectedCategory === "타자"
              ? "bg-blue-900 text-white"
              : "bg-gray-100"
          }`}
          onClick={() => setSelectedCategory("타자")}
        >
          타자
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {selectedCategory === "투수" ? (
          <>
            <RankingCard title="다승" loading={loading} data={winData} />
            <RankingCard title="평균자책" loading={loading} data={eraData} />
            <RankingCard title="탈삼진" loading={loading} data={soData} />
            <RankingCard title="세이브" loading={loading} data={svData} />
          </>
        ) : (
          <>
            <RankingCard title="안타" loading={loading} data={hitData} />
            <RankingCard title="홈런" loading={loading} data={hrData} />
            <RankingCard title="타점" loading={loading} data={rbiData} />
            <RankingCard title="타율" loading={loading} data={avgData} />
          </>
        )}
      </div>

      <div className="mt-8">
        <div className="rounded-2xl bg-white p-4 shadow-md">
          <table className="w-full text-center">
            <thead>
              {selectedCategory === "투수" ? (
                <tr className="bg-gray-100 text-base font-semibold text-gray-700">
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    순위
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 text-left last:border-r-0">
                    선수명
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    팀
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    ERA
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    경기
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    승
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    패
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    세이브
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    홀드
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    승률
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    이닝
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    피안타
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    피홈런
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    볼넷
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    사구
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    탈삼진
                  </th>
                  <th className="px-1 py-2 last:border-r-0">WHIP</th>
                </tr>
              ) : (
                <tr className="bg-gray-100 text-base font-semibold text-gray-700">
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    순위
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 text-left last:border-r-0">
                    선수명
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    팀명
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    AVG
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    G
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    PA
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    AB
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    R
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    H
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    2B
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    3B
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    HR
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    TB
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    RBI
                  </th>
                  <th className="border-r border-gray-200 px-1 py-2 last:border-r-0">
                    SAC
                  </th>
                  <th className="px-1 py-2 last:border-r-0">SF</th>
                </tr>
              )}
            </thead>
            <tbody>
              {selectedCategory === "투수"
                ? pitcherRanks.map(player => (
                    <tr
                      key={player.rank}
                      className="text-base hover:bg-transparent"
                    >
                      <td className="border-r border-gray-200 px-2 py-3 font-bold text-blue-900 last:border-r-0">
                        {player.rank}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 text-left last:border-r-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{player.name}</span>
                        </div>
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.team}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.era}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.games}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.wins}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.losses}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.saves}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.holds}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.wpct}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.innings}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.hits}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.hr}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.bb}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.hbp}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.so}
                      </td>
                      <td className="px-2 py-3 last:border-r-0">
                        {player.whip}
                      </td>
                    </tr>
                  ))
                : batterRanks.map(player => (
                    <tr
                      key={player.rank}
                      className="text-base hover:bg-transparent"
                    >
                      <td className="border-r border-gray-200 px-2 py-3 font-bold text-blue-900 last:border-r-0">
                        {player.rank}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 text-left last:border-r-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{player.name}</span>
                        </div>
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.team}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.avg}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.games}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.pa}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.ab}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.runs}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.hits}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.double}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.triple}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.hr}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.tb}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.rbi}
                      </td>
                      <td className="border-r border-gray-200 px-2 py-3 last:border-r-0">
                        {player.sac}
                      </td>
                      <td className="px-2 py-3 last:border-r-0">{player.sf}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
