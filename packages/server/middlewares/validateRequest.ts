// eslint-disable-next-line import/no-extraneous-dependencies
import { validationResult } from 'express-validator';
import type { RequestWithUser } from 'RequestWithUser';
import type { NextFunction, Response } from 'express';

export const validateRequest = (
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    response.send({ errors: result.array() });
  }
  next();
};
