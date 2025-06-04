import { Trophy } from "lucide-react";

interface Team {
  id: number;
  name: string;
  logo: string;
  prediction: number;
}

// 임시 데이터 - 실제로는 API에서 가져올 데이터
const mockTeams: Team[] = [
  { id: 1, name: "SSG 랜더스", logo: "ssg", prediction: 1 },
  { id: 2, name: "키움 히어로즈", logo: "kiwoom", prediction: 2 },
  { id: 3, name: "LG 트윈스", logo: "lg", prediction: 3 },
  { id: 4, name: "KT 위즈", logo: "kt", prediction: 4 },
  { id: 5, name: "KIA 타이거즈", logo: "kia", prediction: 5 },
  { id: 6, name: "NC 다이노스", logo: "nc", prediction: 6 },
  { id: 7, name: "두산 베어스", logo: "doosan", prediction: 7 },
  { id: 8, name: "롯데 자이언츠", logo: "lotte", prediction: 8 },
  { id: 9, name: "삼성 라이온즈", logo: "samsung", prediction: 9 },
  { id: 10, name: "한화 이글스", logo: "hanwha", prediction: 10 },
];

export default function WinnerPrediction() {
  return (
    <div className="h-[730px] w-[497px] flex-1 rounded-lg border border-[#E5EAF2] bg-white p-6 pb-10">
      <div className="mb-2 flex items-center gap-2">
        <Trophy size={24} className="text-[var(--on-surface-grey1)]" />
        <h3 className="t-h3 text-[var(--on-surface-grey1)]">최종 순위 예측</h3>
      </div>
      <p className="t-body1 mb-3 text-[var(--on-surface-grey1)]">
        AI 기반 최종 순위 예측 결과입니다.
      </p>
      <table className="min-w-full table-fixed border-collapse text-[var(--on-surface-default)]">
        <thead className="h-[48px] border-b border-[#E5EAF2]">
          <tr className="t-body1 h-[48px] text-[var(--on-surface-grey2)]">
            <th className="h-[48px] w-13 px-4 text-center">예상</th>
            <th className="h-[48px] w-9"></th>
            <th className="t-caption h-[48px] w-32 pl-4 text-left">팀명</th>
            <th className="t-caption h-[48px] w-24 px-4 text-center">
              현재 순위
            </th>
            <th className="t-caption h-[48px] w-24 px-4 text-center">승률</th>
          </tr>
        </thead>
        <tbody>
          {mockTeams.map(team => (
            <tr key={team.id} className="h-[56px]">
              <td className="t-h3 h-[56px] w-13 px-4 text-center align-middle text-[var(--on-surface-grey2)]">
                {team.prediction}
              </td>
              <td className="t-body1 h-[56px] w-9 text-left align-middle">
                <img
                  src={`/images/${team.logo}_emb.png`}
                  alt={team.name}
                  className="h-6 w-9 object-contain"
                />
              </td>
              <td className="t-body1 h-[56px] w-32 pl-4 text-left align-middle">
                {team.name}
              </td>
              <td className="t-body1 h-[56px] w-24 px-4 text-center align-middle">
                {team.prediction}
              </td>
              <td className="t-body1 h-[56px] w-24 px-4 text-center align-middle">
                {(Math.random() * 0.3 + 0.4).toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
