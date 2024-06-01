import NotificationService from '../services/NotificationService.js';
import { catchAsyncHandler } from '../utils/errors/CatchAsyncError.js';

const notificationService = new NotificationService();

class NotificationController {
  // @GET /notifications
  getNotifications = catchAsyncHandler(async (req, res) => {
    const result = await notificationService.getNotifications(req.user);
    return res.status(result.statusCode).send(result.resSend);
  });

  // @POST /notifications/mark-read
  markNotificationsAsRead = catchAsyncHandler(async (req, res) => {
    const result = await notificationService.markNotificationsAsRead(req.user);
    return res.status(result.statusCode).send(result.resSend);
  });
}

export default new NotificationController();
