import { Router } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { body, param } from 'express-validator';

import { createAnswer, deleteAnswer, editAnswer, getAnswers } from '../controllers/answer';
import { validateRequest } from '../middlewares/validateRequest';

const answerRoutes = Router();
answerRoutes.get(
  '/:threadId',
  param(['threadId']).escape().notEmpty().trim(),
  validateRequest,
  getAnswers,
);
answerRoutes.post(
  '/',
  body(['title', 'text', 'thread']).escape().notEmpty().trim(),
  validateRequest,
  createAnswer,
);
answerRoutes.delete(
  '/:answerId',
  param(['answerId']).escape().notEmpty().trim(),
  validateRequest,
  deleteAnswer,
);
answerRoutes.put(
  '/:answerId/edit',
  param(['answerId']).escape().notEmpty().trim(),
  validateRequest,
  editAnswer,
);

export { answerRoutes };
