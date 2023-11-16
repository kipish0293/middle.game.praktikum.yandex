import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize';

import { sequelize } from '../db/sequelizeInit';

import { Thread } from './Thread';

interface IAnswerModel {
  id: number;
  author: number;
  text: string;
  title: string;
  thread: number;
}

const answerModel: ModelAttributes<Model, IAnswerModel> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  author: {
    type: DataType.INTEGER,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  text: {
    type: DataType.TEXT,
    allowNull: false,
  },
  thread: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Thread,
      key: 'id',
    },
  },
};

export const Answer = sequelize.define('Answer', answerModel, {
  indexes: [{ fields: ['thread'] }],
});
