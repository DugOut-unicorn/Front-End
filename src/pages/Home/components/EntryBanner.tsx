import { useEffect } from "react";
import {
  getEnglishTeamNameByIdx,
  getTeamLogoByIdx,
} from "../../../hooks/TeamNameChanger";
import { useState } from "react";
import { homeApi } from "../../../api/home/apis";
import { entryBannerDto } from "../../../types/home";

const teamColorMap: { [key: string]: string } = {
  lg: "195,4,82",
  ssg: "206,14,45",
  samsung: "29,102,179",
  nc: "49,82,136",
  doosan: "26,23,72",
  kt: "35,35,35",
  lotte: "4,30,66",
  kiwoom: "87,5,20",
  kia: "143,22,35",
  hanwha: "231,108,27",
  default: "206,14,45",
};

export default function EntryBanner() {
  const [entryBanner, setEntryBanner] = useState<entryBannerDto[]>([]);
  const [teamLogo, setTeamLogo] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  useEffect(() => {
    homeApi.getEntryBanner().then(setEntryBanner);
  }, []);
  useEffect(() => {
    if (entryBanner.length > 0) {
      setTeamLogo(getTeamLogoByIdx(entryBanner[0].cheeringTeamId));
      setTeamName(getEnglishTeamNameByIdx(entryBanner[0].cheeringTeamId));
    }
  }, [entryBanner]);

  if (entryBanner.length === 0) {
    return null;
  }

  const teamColor = teamColorMap[teamName] || teamColorMap.default;

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(${teamColor}, 0.3), rgba(${teamColor}, 0))`,
      }}
      className="flex h-39 w-full flex-row items-center justify-between overflow-hidden px-8 py-9"
    >
      <div className="t-h2 text-[var(--on-surface-grey1)]">
        반가워요 {entryBanner[0].nickname}님!
        <br />
        직관의 설렘, 오늘도 시작해볼까요?
      </div>
      {teamLogo && (
        <img src={teamLogo} alt="teamLogo" className="h-98 w-98 opacity-60" />
      )}
    </div>
  );
}
