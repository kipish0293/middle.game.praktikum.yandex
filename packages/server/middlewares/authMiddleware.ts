import type { Response, NextFunction } from 'express';
import type { RequestWithUser } from 'RequestWithUser';

import { getUserInfo } from '../utils/getUserInfo';
import { protectedRoutes } from '../const/protectedRoutes';
import { AuthorizationError } from '../errors/AuthorizationError';

export const authMiddleware = async (
  request: RequestWithUser,
  _response: Response,
  next: NextFunction,
) => {
  const url = request.originalUrl;
  const isProtectedRoute = protectedRoutes.some((protectedRoute) => url.startsWith(protectedRoute));
  if (request.user) {
    return;
  }
  const { cookie } = request.headers;
  if (!cookie) {
    if (!isProtectedRoute) {
      next();
      return;
    }
    next(new AuthorizationError('Not authorized'));
    return;
  }
  const user = await getUserInfo(cookie);
  if (!user && protectedRoutes.includes(url)) {
    next(new AuthorizationError('Not authorized'));
  }
  request.user = user;
  next();
};
