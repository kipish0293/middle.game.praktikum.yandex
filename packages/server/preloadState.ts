export default async function preloadState(user: unknown) {
  return {
    user: { user, serviceId: undefined, isLoading: false, error: '', isLoggedIn: 'true' },
    score: {
      score: 0,
      isLoading: false,
      error: '',
    },
    gameState: {
      gameState: 0,
    },
    leaderboard: {
      data: undefined,
      isLoading: false,
      error: '',
    },
  };
}
