/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize';
import { psqlConfig } from './configs/config.js';

const postgres = new Sequelize(
  psqlConfig.DB,
  psqlConfig.USER,
  psqlConfig.PASSWORD,
  {
    host: psqlConfig.HOST,
    dialect: psqlConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: psqlConfig.pool.max,
      min: psqlConfig.pool.min,
      acquire: psqlConfig.pool.acquire,
      idle: psqlConfig.pool.idle
    }
  }
);

export default postgres;
