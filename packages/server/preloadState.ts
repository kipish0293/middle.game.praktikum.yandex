const baseUrl = 'https://ya-praktikum.tech/api/v2/';

export default async function preloadState() {
  const user = await fetch(`${baseUrl}/auth/user`, {
    credentials: 'include',
  }).then((response) => {
    if (!response.ok) {
      return {};
    }
    return response.json();
  });
  return {
    user: { user, serviceId: undefined, isLoading: false, error: '', isLoggedIn: 'pending' },
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
