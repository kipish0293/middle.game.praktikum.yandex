import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { protectedRoutes, Routes } from '../const/routes';

import { useAppSelector } from './redux';

export const useProtectedRoute = () => {
  const isLoggedIn = !!useAppSelector((state) => state?.user?.user?.id);
  const location = useLocation();
  const { pathname } = location as { pathname: Routes };
  const redirect = useMemo(
    () => ({
      shouldRedirect: false,
      to: '',
    }),
    [isLoggedIn, pathname],
  );
  const isLoginPage = pathname === Routes.SIGNIN;
  const isMainPage = pathname === Routes.ROOT;
  const isProtectedRouteLocation = protectedRoutes.includes(pathname);
  const redirectToLogin = !isLoggedIn && isProtectedRouteLocation && !isLoginPage;
  const redirectToMainPage = isLoggedIn && !isProtectedRouteLocation && !isMainPage;
  if (redirectToMainPage) {
    redirect.to = Routes.ROOT;
    redirect.shouldRedirect = true;
  }
  if (redirectToLogin) {
    redirect.to = Routes.SIGNIN;
    redirect.shouldRedirect = true;
  }
  return { redirect };
};
