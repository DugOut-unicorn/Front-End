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
    <div className="bg-gray-50 p-4">
      <div className="mb-2 text-sm text-gray-500">{title}</div>
      {loading ? (
        <div className="text-center">로딩 중...</div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-400">데이터 없음</div>
      ) : (
        <>
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">1</span>
              <img
                src={data[0]?.playerImageUrl}
                alt={data[0]?.playerName}
                className="h-12 w-10 object-cover"
              />
              <div>
                <div className="font-bold">{data[0]?.playerName}</div>
                <div className="text-sm text-gray-500">
                  #{data[0]?.backNumber}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-2">
            {data.map((player, i) => (
              <div key={i} className="grid grid-cols-[1fr_40px]">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{i + 1}</span>
                  <span className="text-sm">{player.playerName}</span>
                  <span className="text-sm text-gray-500">
                    #{player.backNumber}
                  </span>
                </div>
                <span className="text-right text-sm">
                  {player.value !== undefined && player.value !== null
                    ? player.value
                    : "-"}
                </span>
              </div>
            ))}
          </div>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
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
            value: item.wpct ?? "-",
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
      } catch (e) {
        setWinData([]);
        setEraData([]);
        setSoData([]);
        setSvData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<"투수" | "타자">(
    "투수",
  );

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
        <RankingCard title="다승" loading={loading} data={winData} />
        <RankingCard title="평균자책" loading={loading} data={eraData} />
        <RankingCard title="탈삼진" loading={loading} data={soData} />
        <RankingCard title="세이브" loading={loading} data={svData} />
      </div>

      <div className="mt-8">
        <table className="w-full">
          <thead>
            {selectedCategory === "투수" ? (
              <tr className="border-y border-gray-200 text-sm">
                <th className="p-3 text-center">순위</th>
                <th className="p-3 text-left">선수명</th>
                <th className="p-3 text-center">팀</th>
                <th className="p-3 text-center">ERA</th>
                <th className="p-3 text-center">경기</th>
                <th className="p-3 text-center">승</th>
                <th className="p-3 text-center">패</th>
                <th className="p-3 text-center">세이브</th>
                <th className="p-3 text-center">홀드</th>
                <th className="p-3 text-center">승률</th>
                <th className="p-3 text-center">이닝</th>
                <th className="p-3 text-center">피안타</th>
                <th className="p-3 text-center">피홈런</th>
                <th className="p-3 text-center">볼넷</th>
                <th className="p-3 text-center">사구</th>
                <th className="p-3 text-center">탈삼진</th>
                <th className="p-3 text-center">WHIP</th>
              </tr>
            ) : (
              <tr className="border-y border-gray-200 text-sm">
                <th className="p-3 text-center">순위</th>
                <th className="p-3 text-left">선수명</th>
                <th className="p-3 text-center">팀명</th>
                <th className="p-3 text-center">AVG</th>
                <th className="p-3 text-center">G</th>
                <th className="p-3 text-center">PA</th>
                <th className="p-3 text-center">AB</th>
                <th className="p-3 text-center">R</th>
                <th className="p-3 text-center">H</th>
                <th className="p-3 text-center">2B</th>
                <th className="p-3 text-center">3B</th>
                <th className="p-3 text-center">HR</th>
                <th className="p-3 text-center">TB</th>
                <th className="p-3 text-center">RBI</th>
                <th className="p-3 text-center">SAC</th>
                <th className="p-3 text-center">SF</th>
              </tr>
            )}
          </thead>
          <tbody>
            {selectedCategory === "투수"
              ? pitcherRanks.map(player => (
                  <tr
                    key={player.rank}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-3 text-center">{player.rank}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span>{player.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">{player.team}</td>
                    <td className="p-3 text-center">{player.era}</td>
                    <td className="p-3 text-center">{player.games}</td>
                    <td className="p-3 text-center">{player.wins}</td>
                    <td className="p-3 text-center">{player.losses}</td>
                    <td className="p-3 text-center">{player.saves}</td>
                    <td className="p-3 text-center">{player.holds}</td>
                    <td className="p-3 text-center">{player.wpct}</td>
                    <td className="p-3 text-center">{player.innings}</td>
                    <td className="p-3 text-center">{player.hits}</td>
                    <td className="p-3 text-center">{player.hr}</td>
                    <td className="p-3 text-center">{player.bb}</td>
                    <td className="p-3 text-center">{player.hbp}</td>
                    <td className="p-3 text-center">{player.so}</td>
                    <td className="p-3 text-center">{player.whip}</td>
                  </tr>
                ))
              : batterRanks.map(player => (
                  <tr
                    key={player.rank}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-3 text-center">{player.rank}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span>{player.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">{player.team}</td>
                    <td className="p-3 text-center">{player.avg}</td>
                    <td className="p-3 text-center">{player.games}</td>
                    <td className="p-3 text-center">{player.pa}</td>
                    <td className="p-3 text-center">{player.ab}</td>
                    <td className="p-3 text-center">{player.runs}</td>
                    <td className="p-3 text-center">{player.hits}</td>
                    <td className="p-3 text-center">{player.double}</td>
                    <td className="p-3 text-center">{player.triple}</td>
                    <td className="p-3 text-center">{player.hr}</td>
                    <td className="p-3 text-center">{player.tb}</td>
                    <td className="p-3 text-center">{player.rbi}</td>
                    <td className="p-3 text-center">{player.sac}</td>
                    <td className="p-3 text-center">{player.sf}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
