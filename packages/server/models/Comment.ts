import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize';

import { sequelize } from '../db/sequelizeInit';

import { Answer } from './Answer';

export interface ICommentModel {
  id: number;
  author: number;
  text: string;
  parentComment: number;
  childComment: number | ICommentModel;
  answer: number;
  isDeleted: boolean;
}

const commentModel: ModelAttributes<Model, ICommentModel> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  author: {
    type: DataType.INTEGER,
  },
  text: {
    type: DataType.TEXT,
    allowNull: false,
  },
  parentComment: {
    type: DataType.INTEGER,
  },
  childComment: {
    type: DataType.INTEGER,
  },
  isDeleted: {
    type: DataType.BOOLEAN,
  },
  answer: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Answer,
      key: 'id',
    },
  },
};
export const Comment = sequelize.define('Comment', commentModel, {
  indexes: [{ fields: ['answer'] }],
});
