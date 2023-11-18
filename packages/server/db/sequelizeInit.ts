import process from 'node:process';

import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const { POSTGRES_URL } = process.env;
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;
const sequelizeOptions: SequelizeOptions = {
  username: POSTGRES_USER,
  host: POSTGRES_URL || 'host.docker.internal',
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);
