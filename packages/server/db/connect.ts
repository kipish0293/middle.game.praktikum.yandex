import { Reaction } from '../models/Reaction';
import { Answer } from '../models/Answer';
import { Thread } from '../models/Thread';
import { Comment } from '../models/Comment';

import { sequelize } from './sequelizeInit';

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await Thread.sync();
    await Answer.sync();
    await Comment.sync();
    await Reaction.sync();
    await sequelize.sync(); // Синхронизация базы данных
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
