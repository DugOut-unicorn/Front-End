export default function Scoreboard() {
  return (
    <div className="mx-auto max-w-[1080px] p-4">
      {/* 배경 그라디언트 & 둥근 모서리 */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1F1F1F] to-[#2A2A2A] px-6 py-6 text-white shadow-lg">
        {/* 상단: 팀 로고 + 팀명 + 득점 + 경기 상태/날짜/시간/구장 */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* 왼쪽 팀 정보 */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="/images/lotte_emb.png"
              alt="롯데 자이언츠"
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold">롯데</span>
            <span className="text-xs text-gray-300">투수: (예시)</span>
          </div>
          <div className="text-6xl font-bold">{3}</div>
          {/* 중앙: 경기 상태 / 날짜 / 시간 / 구장 */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-300">경기 종료</span>
            <span className="text-lg font-semibold">2023.03.17</span>
            <span className="text-lg font-semibold">13:00</span>
            <span className="text-sm text-gray-300">고척</span>
          </div>
          <div className="text-6xl font-bold">{4}</div>
          {/* 오른쪽 팀 정보 */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="/images/kiwoom_emb.png"
              alt="키움 히어로즈"
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold">키움</span>
            <span className="text-xs text-gray-300">투수: (예시)</span>
          </div>
        </div>

        {/* 이닝별 상세 스코어 테이블 */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-center text-sm">
            <thead>
              <tr className="text-gray-300">
                {/* 팀명 열 영역 폭 축소 (예: 60px) */}
                <th className="w-[60px] border-r border-gray-600 py-2">팀명</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                {/* 9 이후 R, H, E, B 열 영역 축소 (예: 40px씩) */}
                <th className="w-[40px] border-l border-gray-600">R</th>
                <th className="w-[40px]">H</th>
                <th className="w-[40px]">E</th>
                <th className="w-[40px]">B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="w-[60px] border-r border-gray-600 py-2 font-bold">
                  롯데
                </td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td className="w-[40px] border-l border-gray-600 font-bold">
                  3
                </td>
                <td className="w-[40px]">7</td>
                <td className="w-[40px]">1</td>
                <td className="w-[40px]">0</td>
              </tr>
              <tr>
                <td className="w-[60px] border-r border-gray-600 py-2 font-bold">
                  키움
                </td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>2</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>-</td>
                <td className="w-[40px] border-l border-gray-600 font-bold">
                  4
                </td>
                <td className="w-[40px]">9</td>
                <td className="w-[40px]">0</td>
                <td className="w-[40px]">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
