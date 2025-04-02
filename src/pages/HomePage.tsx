// src/pages/Home.tsx
import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      {/* 상단 배너 섹션 */}
      <section className="bg-gray-200 py-8">
        <div className="mx-auto max-w-[1080px] px-4">
          <h1 className="mb-4 text-2xl font-bold">치열했던 KIA 5연패 경기</h1>
          <div className="flex h-64 w-full items-center justify-center bg-white">
            <p>슬라이드/배너 영역</p>
          </div>
        </div>
      </section>

      {/* 진행 중인 경기 섹션 */}
      <section className="py-8">
        <div className="mx-auto max-w-[1080px] px-4">
          <h2 className="mb-4 text-xl font-semibold">진행 중인 경기</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow">
              <p>두산 vs LG</p>
              <p>3:2 (5회)</p>
            </div>
            <div className="bg-white p-4 shadow">
              <p>NC vs KIA</p>
              <p>1:0 (3회)</p>
            </div>
            <div className="bg-white p-4 shadow">
              <p>SSG vs 롯데</p>
              <p>4:4 (7회)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 팀 순위 섹션 */}
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

      {/* 경기 일정 섹션 */}
      <section className="py-8">
        <div className="mx-auto max-w-[1080px] px-4">
          <h2 className="mb-4 text-xl font-semibold">경기 일정</h2>
          <div className="bg-white p-4 shadow">
            <p>달력 컴포넌트 예시</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
