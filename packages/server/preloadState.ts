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
  console.log(user);
  return { user: { user }, score: {}, gameState: {}, leaderboard: {} };
}
