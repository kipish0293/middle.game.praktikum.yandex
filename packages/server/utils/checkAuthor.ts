import { AuthorizationError } from '../errors/AuthorizationError';

export const checkAuthor = (authorId: string | null, userId: string) => {
  if (authorId !== userId) {
    throw new AuthorizationError('not authorized');
  }
};
