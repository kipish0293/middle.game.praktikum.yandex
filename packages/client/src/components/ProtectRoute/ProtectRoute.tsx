import { Navigate, Outlet } from 'react-router-dom';

import { useProtectedRoute } from '@app/hooks';

export function ProtectedRoute() {
  const { redirect } = useProtectedRoute();
  return redirect.shouldRedirect ? <Navigate to={redirect.to} /> : <Outlet />;
}
