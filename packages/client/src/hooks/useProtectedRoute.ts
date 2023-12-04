import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { protectedRoutes, Routes } from '../const/routes';

import { useAppSelector } from './redux';

export const useProtectedRoute = () => {
  const isLoggedIn = !!useAppSelector((state) => state?.user?.user?.id);
  const location = useLocation();
  const [searchParameters] = useSearchParams();

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
    const code = searchParameters.get('code');
    const to = code ? `${Routes.SIGNIN}/?code=${code}` : Routes.SIGNIN;
    redirect.to = to;
    redirect.shouldRedirect = true;
  }
  return { redirect };
};
