import type { RequestWithUser } from 'RequestWithUser';
import type { NextFunction, Response } from 'express';

import { Answer } from '../models/Answer';
import { checkAuthor } from '../utils/checkAuthor';

export const createAnswer = (request: RequestWithUser, response: Response, next: NextFunction) => {
  const { text, thread, title } = request.body;
  Answer.create({ author: request?.user?.id, text, thread, title })
    .then((answer) => response.send(answer.dataValues))
    .catch((error) => next(error));
};

export const deleteAnswer = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) => {
  const { answerId } = request.params;
  const userId = request?.user?.id;
  const answerToDelete = await Answer.findOne({ where: { id: answerId } });
  try {
    checkAuthor(answerToDelete?.dataValues.author, userId as string);
  } catch (error) {
    next(error);
  }
  Answer.destroy({ where: { id: answerId } })
    .then(() => response.status(200).send({ message: `answer ${answerId} deleted` }))
    .catch((error) => next(error));
};

export const getAnswers = (request: RequestWithUser, response: Response, next: NextFunction) => {
  const { threadId } = request.params;
  const { offset, limit } = request.query;
  Answer.findAll({
    where: { thread: threadId },
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  })
    .then((answers) => response.send({ data: answers }))
    .catch((error) => next(error));
};

export const editAnswer = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) => {
  const { answerId } = request.params;
  const { title, text } = request.body;
  const userId = request?.user?.id;
  const answerToEdit = await Answer.findOne({ where: { id: answerId } });
  try {
    checkAuthor(answerToEdit?.dataValues.author, userId as string);
  } catch (error) {
    next(error);
  }
  Answer.update({ title, text }, { where: { id: answerId } })
    .then((answer) => response.send({ answer }))
    .catch((error) => next(error));
};
