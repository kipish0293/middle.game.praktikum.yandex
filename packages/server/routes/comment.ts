import { Router } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { body, param } from 'express-validator';

import { createComment, deleteComment, editComment, getComments } from '../controllers/comment';
import { validateRequest } from '../middlewares/validateRequest';

const commentRoutes = Router();
commentRoutes.get(
  '/:answerId',
  param(['answerId']).escape().notEmpty().trim(),
  validateRequest,
  getComments,
);
commentRoutes.post(
  '/',
  body(['text', 'answer']).escape().notEmpty().trim(),
  validateRequest,
  createComment,
);
commentRoutes.delete(
  '/:commentId',
  param(['commentId']).escape().notEmpty().trim(),
  validateRequest,
  deleteComment,
);
commentRoutes.put(
  '/:commentId/edit',
  param(['commentId']).escape().notEmpty().trim(),
  validateRequest,
  editComment,
);

export { commentRoutes };
