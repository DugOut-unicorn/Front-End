const data = [
    { season: '2025', era: '21.00', whip: '3.33', war: '-0.21', qs: 0, g: 1, w: 0, l: 1, sv: 0, hld: 0, ip: '3', so: 2 },
    { season: '2024', era: '3.35', whip: '1.23', war: '4.40', qs: 17, g: 25, w: 9, l: 6, sv: 0, hld: 0, ip: '150 2/3', so: 171 },
    { season: '2023', era: '3.28', whip: '1.33', war: '4.21', qs: 18, g: 30, w: 11, l: 10, sv: 0, hld: 0, ip: '170 1/3', so: 147 },
    { season: '2022', era: '3.62', whip: '1.20', war: '3.69', qs: 18, g: 31, w: 12, l: 12, sv: 0, hld: 0, ip: '186 1/3', so: 160 },
  ];
  
  export default function CareerStatsTable() {
    return (
      <div className="relative overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm text-center border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-100 px-4 py-2">시즌</th>
              <th className="px-4 py-2">평균자책</th>
              <th className="px-4 py-2">WHIP</th>
              <th className="px-4 py-2">WAR</th>
              <th className="px-4 py-2">QS</th>
              <th className="px-4 py-2">경기</th>
              <th className="px-4 py-2">승</th>
              <th className="px-4 py-2">패</th>
              <th className="px-4 py-2">세이브</th>
              <th className="px-4 py-2">홀드</th>
              <th className="px-4 py-2">이닝</th>
              <th className="px-4 py-2">탈삼진</th>

              <th className="px-4 py-2">탈삼진</th>
              <th className="px-4 py-2">피안타</th>
              <th className="px-4 py-2">피홈런</th>
              <th className="px-4 py-2">볼넷</th>
              <th className="px-4 py-2">사구</th>
              <th className="px-4 py-2">사구</th>
              <th className="px-4 py-2">폭투</th>
              <th className="px-4 py-2">실점</th>
              <th className="px-4 py-2">승률</th>
              <th className="px-4 py-2">k/9</th>
              <th className="px-4 py-2">BB/9</th>

              <th className="px-4 py-2">K/BB</th>
              <th className="px-4 py-2">k%</th>
              <th className="px-4 py-2">BB%</th>
              <th className="px-4 py-2">WPA</th>

              
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-t">
                <td className="sticky left-0 z-10 bg-white px-4 py-2 font-semibold">
                  {row.season}
                </td>
                <td className="px-4 py-2">{row.era}</td>
                <td className="px-4 py-2">{row.whip}</td>
                <td className="px-4 py-2">{row.war}</td>
                <td className="px-4 py-2">{row.qs}</td>
                <td className="px-4 py-2">{row.g}</td>
                <td className="px-4 py-2">{row.w}</td>
                <td className="px-4 py-2">{row.l}</td>
                <td className="px-4 py-2">{row.sv}</td>
                <td className="px-4 py-2">{row.hld}</td>
                <td className="px-4 py-2">{row.ip}</td>
                <td className="px-4 py-2">{row.so}</td>

                <td className="px-4 py-2">{row.era}</td>
                <td className="px-4 py-2">{row.whip}</td>
                <td className="px-4 py-2">{row.war}</td>
                <td className="px-4 py-2">{row.qs}</td>
                <td className="px-4 py-2">{row.g}</td>
                <td className="px-4 py-2">{row.w}</td>
                <td className="px-4 py-2">{row.l}</td>
                <td className="px-4 py-2">{row.sv}</td>
                <td className="px-4 py-2">{row.hld}</td>
                <td className="px-4 py-2">{row.ip}</td>
                <td className="px-4 py-2">{row.so}</td>

                <td className="px-4 py-2">{row.sv}</td>
                <td className="px-4 py-2">{row.hld}</td>
                <td className="px-4 py-2">{row.ip}</td>
                <td className="px-4 py-2">{row.so}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  