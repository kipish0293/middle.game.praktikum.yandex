export default async function preloadState(user: unknown) {
  return {
    user: { user, serviceId: undefined, isLoading: false, error: '' },
    score: {
      score: 0,
      highestScore: 0,
      isLoading: false,
      error: '',
    },
    gameState: {
      level: 1,
      gameState: 0,
    },
    leaderboard: {
      data: undefined,
      isLoading: false,
      error: '',
    },
  };
}
