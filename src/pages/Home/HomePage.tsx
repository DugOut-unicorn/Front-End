import LastResult from "./components/LastResult";
import NewMatchingList from "./components/NewMatchingList";
import NewsBanner from "./components/NewsBanner";
import PlayingGame from "./components/PlayingGame";
import TeamSection from "./components/TeamSection";
import MapWeatherContainer from "./container/MapWeatherContainer";
import TopBannerContainer from "./container/TopBannerContainer";
import { Team, TeamOverviewSection } from "./container/TeamOverviewSection";
import { useState } from "react";

export default function Home() {
  const [month, setMonth] = useState(new Date(2023, 5));
  const sampleTeams: Team[] = [
    {
      id: "lg",
      logo: "/images/lg_emb.png",
      name: "LG",
      games: 26,
      wins: 19,
      draws: 0,
      losses: 7,
    },
    {
      id: "hanwha",
      logo: "/images/hanwha_emb.png",
      name: "한화",
      games: 27,
      wins: 15,
      draws: 0,
      losses: 12,
    },
    {
      id: "samsung",
      logo: "/images/samsung_emb.png",
      name: "삼성",
      games: 26,
      wins: 14,
      draws: 0,
      losses: 12,
    },
    {
      id: "lotte",
      logo: "/images/lotte_emb.png",
      name: "롯데",
      games: 27,
      wins: 14,
      draws: 1,
      losses: 12,
    },
    {
      id: "kt",
      logo: "/images/kt_emb.png",
      name: "KT",
      games: 26,
      wins: 13,
      draws: 1,
      losses: 12,
    },
    {
      id: "ssg",
      logo: "/images/ssg_emb.png",
      name: "SSG",
      games: 24,
      wins: 12,
      draws: 0,
      losses: 12,
    },
    {
      id: "kia",
      logo: "/images/kia_emb.png",
      name: "KIA",
      games: 26,
      wins: 11,
      draws: 0,
      losses: 14,
    },
    {
      id: "doosan",
      logo: "/images/doosan_emb.png",
      name: "두산",
      games: 26,
      wins: 11,
      draws: 0,
      losses: 14,
    },
    {
      id: "nc",
      logo: "/images/nc_emb.png",
      name: "NC",
      games: 22,
      wins: 9,
      draws: 0,
      losses: 13,
    },
    {
      id: "kiwoom",
      logo: "/images/kiwoom_emb.png",
      name: "키움",
      games: 28,
      wins: 9,
      draws: 0,
      losses: 19,
    },
  ];

  return (
    <>
      <TopBannerContainer />
      <div className="h-[120px]" />
      <TeamOverviewSection
        teams={sampleTeams}
        month={new Date()}
        onMonthChange={newMonth => setMonth(newMonth)}
      />
      {/* <NewMatchingList />
      <TeamSection /> */}
      {/* <MapWeatherContainer /> */}
    </>
  );
}
