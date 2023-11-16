import type { Request, Response, NextFunction } from 'express';

interface Error {
  errCode?: number;
  message?: string;
}
export type ErrorRequestHandler = (
  error: Error,
  request: Request,
  res: Response,
  next: NextFunction,
) => any;

export const errorHandler: ErrorRequestHandler = (error, _request, res, _next) => {
  const { errCode: errorCode = 500, message = 'Ошибка сервера' } = error;
  res.status(errorCode).send({ message });
  console.log(error);
};
