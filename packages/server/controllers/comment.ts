import type { NextFunction, Response } from 'express';

import type { RequestWithUser } from '../types/RequestWithUser';
import { Comment, ICommentModel } from '../models/Comment';
import { checkAuthor } from '../utils/checkAuthor';
import { ValidationError } from '../errors/ValidationError';

export const createComment = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) => {
  const { text, answer, parentComment = null } = request.body;
  if (parentComment) {
    const parentCommentToCheck = await Comment.findOne({ where: { id: parentComment } });
    if (!parentCommentToCheck) {
      next(new ValidationError('Parent comment not exist'));
    }
  }
  Comment.create({ author: request?.user?.id, answer, text, parentComment, isDeleted: false })
    .then((comment) => response.send(comment.dataValues))
    .catch((error) => next(error));
};

export const deleteComment = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) => {
  const { commentId } = request.params;
  const userId = request?.user?.id;
  const commentToDelete = await Comment.findOne({ where: { id: commentId } });
  try {
    checkAuthor(commentToDelete?.dataValues.author, userId as string);
  } catch (error) {
    next(error);
  }
  Comment.update({ isDeleted: true }, { where: { id: commentId } })
    .then(() => response.status(200).send({ message: `comment ${commentId} marked as deleted` }))
    .catch((error) => next(error));
};

export const getComments = async (
  request: RequestWithUser,
  response: Response,
  _next: NextFunction,
) => {
  const { answerId } = request.params;
  const commentsArray = (await Comment.findAll({
    where: { answer: answerId },
  })) as unknown as ICommentModel[];
  const commentsTree = [];
  for (const comment of commentsArray) {
    if (comment.parentComment) {
      const parentComment = commentsArray.find((_comment) => _comment.id === comment.parentComment);
      if (parentComment) {
        parentComment.childComment = comment;
      }
    } else {
      commentsTree.push(comment);
    }
  }
  response.status(200).send({ data: commentsTree });
};

export const editComment = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) => {
  const { commentId } = request.params;
  const { text } = request.body;
  const userId = request?.user?.id;
  const commentToEdit = await Comment.findOne({ where: { id: commentId } });
  try {
    checkAuthor(commentToEdit?.dataValues.author, userId as string);
  } catch (error) {
    next(error);
  }
  Comment.update({ text }, { where: { id: commentId } })
    .then((answer) => response.send({ answer }))
    .catch((error) => next(error));
};
