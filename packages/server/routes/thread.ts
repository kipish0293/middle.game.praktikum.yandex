import { Router } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { body, param } from 'express-validator';

import { createThread, deleteThread, editThread, getThreads } from '../controllers/thread';
import { validateRequest } from '../middlewares/validateRequest';

const threadRoutes = Router();
threadRoutes.get('/', getThreads);
threadRoutes.post('/', body(['title']).escape().notEmpty().trim(), validateRequest, createThread);
threadRoutes.delete(
  '/:threadId',
  param(['threadId']).escape().notEmpty().trim(),
  validateRequest,
  deleteThread,
);
threadRoutes.put(
  '/:threadId/edit',
  param(['threadId']).escape().notEmpty().trim(),
  validateRequest,
  editThread,
);

export { threadRoutes };
