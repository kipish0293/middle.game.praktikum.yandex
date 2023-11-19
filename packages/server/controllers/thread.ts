import type { NextFunction, Response } from 'express';

import type { RequestWithUser } from '../types/RequestWithUser';
import { Thread } from '../models/Thread';
import { checkAuthor } from '../utils/checkAuthor';

export const createThread = (request: RequestWithUser, response: Response, next: NextFunction) => {
  const { title } = request.body;
  Thread.create({ author: request?.user?.id, title })
    .then((thread) => response.send(thread.dataValues))
    .catch((error) => next(error));
};

export const deleteThread = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) => {
  const { threadId } = request.params;
  const userId = request?.user?.id;
  const threadToDelete = await Thread.findOne({ where: { id: threadId } });
  try {
    checkAuthor(threadToDelete?.dataValues.author, userId as string);
    Thread.destroy({ where: { id: threadId } })
      .then(() => response.status(200).send({ message: `thread ${threadId} deleted` }))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

export const getThreads = (request: RequestWithUser, response: Response, next: NextFunction) => {
  const { offset, limit } = request.query;
  Thread.findAll({
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  })
    .then((threads) => response.send({ data: threads }))
    .catch((error) => next(error));
};

export const editThread = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) => {
  const { threadId } = request.params;
  const { title } = request.body;
  const userId = request?.user?.id;
  const threadToEdit = await Thread.findOne({ where: { id: threadId } });
  try {
    checkAuthor(threadToEdit?.dataValues.author, userId as string);
    Thread.update({ title }, { where: { id: threadId }, returning: true })
      .then((thread) => response.send({ thread }))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};
