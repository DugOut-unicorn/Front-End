import GameResultCard from "../../../components/common/GameResultCard";

const mockResults = [
  {
    homeTeam: {
      name: "롯데",
      score: 3,
      logo: "/images/lotte_emb.png",
    },
    awayTeam: {
      name: "키움",
      score: 4,
      logo: "/images/kiwoom_emb.png",
    },
  },
  {
    homeTeam: {
      name: "롯데",
      score: 3,
      logo: "/images/lotte_emb.png",
    },
    awayTeam: {
      name: "키움",
      score: 4,
      logo: "/images/kiwoom_emb.png",
    },
  },
  {
    homeTeam: {
      name: "롯데",
      score: 3,
      logo: "/images/lotte_emb.png",
    },
    awayTeam: {
      name: "키움",
      score: 4,
      logo: "/images/kiwoom_emb.png",
    },
  },
  {
    homeTeam: {
      name: "롯데",
      score: 3,
      logo: "/images/lotte_emb.png",
    },
    awayTeam: {
      name: "키움",
      score: 4,
      logo: "/images/kiwoom_emb.png",
    },
  },
  {
    homeTeam: {
      name: "롯데",
      score: 3,
      logo: "/images/lotte_emb.png",
    },
    awayTeam: {
      name: "키움",
      score: 4,
      logo: "/images/kiwoom_emb.png",
    },
  },
];

export default function LastResult() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1080px] px-4">
        <h2 className="mb-2 text-2xl font-bold">최근 경기 결과</h2>
        <p className="mb-8 text-gray-600">
          최근 종료된 경기 결과를 한 눈에 확인하세요
        </p>
        <div className="grid grid-cols-5 gap-4">
          {mockResults.map((result, index) => (
            <GameResultCard key={index} {...result} />
          ))}
        </div>
      </div>
    </section>
  );
}
