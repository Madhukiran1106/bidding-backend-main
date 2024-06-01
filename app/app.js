import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './configs/config.js';
import { AppError } from './utils/errors/AppError.js';
import { errorHandler } from './middlewares/ErrorHandler.js';
import UserRouter from './routes/UserRoutes.js';
import ItemRouter from './routes/ItemsRoute.js';
import NotificationRouter from './routes/NotificationRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

/**
 *  Base server endpoints for checks ,health checks.
 */

app.get('/', (_req, res) => { 
  res.send('🚀 Server running...');
});

app.get('/api/v1', (_req, res) => {
  res.send('Bidding API Version 1.0.0');
});

/**
 * Define all the endpoints for the server here.
 *
 */

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/items',ItemRouter);
app.use('/api/v1/notifications',NotificationRouter);

// end of server endpoints --->

app.all('*', (req, res, next) => {
  next(
    new AppError({
      message: `Can't find ${req.originalUrl} on the server`,
      statusCode: 404
    })
  );
});

app.use(errorHandler);

export default app;
