export type rankingDto = {
  teamName: string;
  game: number;
  win: number;
  draw: number;
  lose: number;
};

export type newsDto = {
  title: string;
  url: string;
  imageUrl: string;
};

export type recentMatchingDto = {
  postIdx: number;
  title: string;
  stadiumIdx: number;
  gameIdx: number;
  context: string;
  userNickname: string;
  status: number;
  createdAt: string;
};
