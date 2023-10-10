export const enum Routes {
  ROOT = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  GAME = '/game',
  PROFILE = '/profile',
  FORUM = '/forum',
  LEADER_BOARD = '/leaderboard',
  SERVICE_UNAVAILABLE = '/service-unavailable',
  GAME_OVER = '/game-over',
}

export const protectedRoutes = [
  Routes.FORUM,
  Routes.GAME,
  Routes.PROFILE,
  Routes.FORUM,
  Routes.LEADER_BOARD,
  Routes.ROOT,
  Routes.GAME_OVER,
  Routes.SERVICE_UNAVAILABLE,
];
