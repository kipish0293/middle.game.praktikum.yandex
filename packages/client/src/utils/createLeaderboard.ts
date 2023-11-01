import { LeaderboardData } from '@app/types';

export const createLeaderboard = (data: string) => {
  const array = JSON.parse(data);
  array.splice(0, 1);
  return array.map((item: LeaderboardData, index: number) => ({
    place: index + 1,
    player: item.data.name,
    score: item.data.score[0],
  }));
};
