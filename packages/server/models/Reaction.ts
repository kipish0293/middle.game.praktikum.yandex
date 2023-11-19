import type { Model, ModelAttributes } from 'sequelize';
import { DataType } from 'sequelize-typescript';

import { sequelize } from '../db/sequelizeInit';

import { Thread } from './Thread';

export interface IReactionModel {
  id: number;
  threadId: number;
  emoji: string;
}

const reactionModel: ModelAttributes<Model, IReactionModel> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  threadId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Thread,
      key: 'id',
    },
  },
  emoji: {
    type: DataType.TEXT,
    allowNull: false,
  },
};

export const Reaction = sequelize.define('Reaction', reactionModel, {});
