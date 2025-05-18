export type MatchData = {
  id: number; // 글 번호
  writer: string; // 작성자
  team: string; // 응원하는 팀
  title: string; // 매칭글 제목
  hasTicket: boolean; // 티켓 보유 여부
};

export type TeamId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const TEAM_ID_MAP: Record<TeamId, { name: string; logo: string }> = {
  1: { name: "LG", logo: "lg_emb" },
  2: { name: "SSG", logo: "ssg_emb" },
  3: { name: "삼성", logo: "samsung_emb" },
  4: { name: "KT", logo: "kt_emb" },
  5: { name: "롯데", logo: "lotte_emb" },
  6: { name: "NC", logo: "nc_emb" },
  7: { name: "두산", logo: "doosan_emb" },
  8: { name: "키움", logo: "kiwoom_emb" },
  9: { name: "KIA", logo: "kia_emb" },
  10: { name: "한화", logo: "hanwha_emb" },
} as const;

export function getTeamInfo(teamId: TeamId) {
  return TEAM_ID_MAP[teamId] || { name: "알 수 없음", logo: "default" };
}
