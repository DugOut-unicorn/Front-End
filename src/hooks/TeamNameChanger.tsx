const teamNameMap: { [key: string]: string } = {
  LG: "lg",
  SSG: "ssg",
  삼성: "samsung",
  NC: "nc",
  두산: "doosan",
  KT: "kt",
  롯데: "lotte",
  키움: "kiwoom",
  KIA: "kia",
  한화: "hanwha",
};

const teamIdxToName: { [key: number]: string } = {
  1: "LG",
  2: "SSG",
  3: "삼성",
  4: "KT",
  5: "롯데",
  6: "NC",
  7: "두산",
  8: "키움",
  9: "KIA",
  10: "한화",
};

export function getEnglishTeamName(koreanName: string): string {
  const mappedName = teamNameMap[koreanName];
  if (!mappedName) {
    console.warn(`팀 이름 매핑을 찾을 수 없습니다: ${koreanName}`);
    return koreanName.toLowerCase();
  }
  return mappedName;
}

export function getTeamNameByIdx(teamIdx: number): string {
  const koreanName = teamIdxToName[teamIdx];
  if (!koreanName) {
    console.warn(`팀 인덱스 매핑을 찾을 수 없습니다: ${teamIdx}`);
    return String(teamIdx);
  }
  return koreanName;
}

export function getTeamLogoByIdx(teamIdx: number): string {
  const englishName = getEnglishTeamName(teamIdxToName[teamIdx]);
  return `/images/${englishName}_big_emb.png`;
}

export function getEnglishTeamNameByIdx(teamIdx: number): string {
  const koreanName = teamIdxToName[teamIdx];
  if (!koreanName) {
    console.warn(`팀 인덱스 매핑을 찾을 수 없습니다: ${teamIdx}`);
    return String(teamIdx);
  }
  return getEnglishTeamName(koreanName);
}
