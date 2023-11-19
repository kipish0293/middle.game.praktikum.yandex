import type { NextFunction, Response } from 'express';
import type { RequestWithUser } from 'types/RequestWithUser';

import { Reaction } from '../models/Reaction';

export const addReaction = (request: RequestWithUser, response: Response, next: NextFunction) => {
  const { threadId, emoji } = request.body;
  Reaction.create({ threadId, emoji })
    .then((reaction) => response.send(reaction.dataValues))
    .catch((error) => next(error));
};

export const deleteReaction = (
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) => {
  const { reactionId } = request.body;
  Reaction.destroy({ where: { id: reactionId } })
    .then(() => response.status(200))
    .catch((error) => next(error));
};

export const getReactions = (request: RequestWithUser, response: Response, next: NextFunction) => {
  const { threadId } = request.body;
  Reaction.findAll({ where: { threadId } })
    .then((reactions) => response.send({ data: reactions }))
    .catch((error) => next(error));
};
