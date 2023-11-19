import { Router } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validateRequest';
import { addReaction, deleteReaction, getReactions } from '../controllers/reaction';

const reactionRoutes = Router();
reactionRoutes.get('/', body(['threadId']).exists(), validateRequest, getReactions);
reactionRoutes.post(
  '/',
  body(['threadId', 'emoji']).exists().escape(),
  validateRequest,
  addReaction,
);
reactionRoutes.delete('/', body(['reactionId']).exists(), deleteReaction);

export { reactionRoutes };
