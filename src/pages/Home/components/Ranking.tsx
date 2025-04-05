export default function Ranking() {
  return (
    <>
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-[1080px] px-4">
          <h2 className="mb-4 text-xl font-semibold">팀 순위</h2>
          <table className="w-full bg-white text-left shadow">
            <thead>
              <tr className="border-b">
                <th className="p-2">순위</th>
                <th className="p-2">팀명</th>
                <th className="p-2">전적</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">1위</td>
                <td className="p-2">구단 이름</td>
                <td className="p-2">10W / 1L</td>
              </tr>
              {/* 추가 팀 데이터 */}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
