export type Leaderbord = {
  place: number;
  player: string;
  score: string;
};

type UserData = {
  name: string;
  score: number[];
  avatar: string | null;
};

export type LeaderboardData = {
  data: UserData;
};
