import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

import { protectedRoutes, Routes } from '../const/routes';

import { useAppSelector } from './redux';

const enum LoggedInStatus {
  PENDING = 'pending',
  TRUE = 'true',
  FALSE = 'false',
}

export const useProtectedRoute = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const auth = isLoggedIn === LoggedInStatus.TRUE;
  const pending = isLoggedIn === LoggedInStatus.PENDING;
  const location = useLocation();
  const { pathname } = location as { pathname: Routes };
  const redirect = useMemo(
    () => ({
      shouldRedirect: false,
      to: '',
    }),
    [isLoggedIn, pathname],
  );
  const isLoginPage = pathname === Routes.LOGIN;
  const isMainPage = pathname === Routes.ROOT;
  const isProtectedRouteLocation = protectedRoutes.includes(pathname);
  const redirectToLogin = !auth && isProtectedRouteLocation && !isLoginPage && !pending;
  const redirectToMainPage = auth && !isProtectedRouteLocation && !isMainPage && !pending;
  if (redirectToMainPage) {
    redirect.to = Routes.ROOT;
    redirect.shouldRedirect = true;
  }
  if (redirectToLogin) {
    redirect.to = Routes.LOGIN;
    redirect.shouldRedirect = true;
  }
  return { redirect };
};
