import express from 'express';
import NotificationController from '../controllers/NotificationController.js';
import UserAuth from '../middlewares/AuthorizationMiddleware.js';

const NotificationRouter = express.Router();

NotificationRouter.get('/', UserAuth, NotificationController.getNotifications);
NotificationRouter.post(
  '/mark-read',
  UserAuth,
  NotificationController.markNotificationsAsRead
);

export default NotificationRouter;
