export const enum Routes {
  ROOT = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  GAME = '/game',
  PROFILE = '/profile',
  FORUM = '/forum',
  LEADER_BOARD = '/leaderboard',
}

export const ProtectedRoutes = [
  Routes.FORUM,
  Routes.GAME,
  Routes.PROFILE,
  Routes.FORUM,
  Routes.LEADER_BOARD,
];
export const unprotectedRoutes = [Routes.REGISTER, Routes.LOGIN];
