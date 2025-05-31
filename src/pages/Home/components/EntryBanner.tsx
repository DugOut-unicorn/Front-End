import { useEffect } from "react";
import {
  getEnglishTeamNameByIdx,
  getTeamLogoByIdx,
} from "../../../hooks/TeamNameChanger";
import { useState } from "react";
import { homeApi } from "../../../api/home/apis";
import { entryBannerDto } from "../../../types/home";

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

  return (
    <div
      className={`flex h-39 w-full flex-row items-center justify-between overflow-hidden bg-gradient-to-b from-[rgba(var(--team-${teamName || "default"}-rgb),0.3)] to-[rgba(var(--team-${teamName || "default"}-rgb),0)] px-8 py-9`}
    >
      <div className="t-h2 text-[var(--on-surface-grey1)]">
        반가워요 {entryBanner[0].nickname}님!
        <br />
        직관의 설렘, 오늘도 시작해볼까요?
      </div>
      <img src={teamLogo} alt="teamLogo" className="h-98 w-98 opacity-60" />
    </div>
  );
}
