import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

import { protectedRoutes, Routes } from '../const/routes';

import { useAppSelector } from './redux';

export const useProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.user);
  const auth = !!user;
  const location = useLocation();
  const { pathname } = location as { pathname: Routes };
  const redirect = useMemo(
    () => ({
      shouldRedirect: false,
      to: '',
    }),
    [auth, pathname],
  );
  const isLoginPage = pathname === Routes.LOGIN;
  const isMainPage = pathname === Routes.ROOT;
  const isProtectedRouteLocation = protectedRoutes.includes(pathname);
  const redirectToLogin = !auth && isProtectedRouteLocation && !isLoginPage;
  const redirectToMainPage = auth && !isProtectedRouteLocation && !isMainPage;
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
