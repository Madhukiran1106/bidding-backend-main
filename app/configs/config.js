import dotenv from 'dotenv';

if (!dotenv.config()) {
  console.error('Failed to load.env file');
  throw new Error('Failed to load.env file');
}

export const config = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY
};

export const psqlConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
