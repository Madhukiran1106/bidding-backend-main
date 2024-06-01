import NotificationDB from '../models/notifications.js';

class NotificationRepo {
  constructor() {
    this.notification = NotificationDB;
  }

  // Retrieve notifications for a specific user
  async getNotificationsByUserId(userId) {
    const notifications = await this.notification.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });
    if (!notifications.length) {
      return {
        success: false,
        docExists: false
      };
    }
    return {
      success: true,
      docExists: true,
      doc: notifications
    };
  }

  // Mark notifications as read
  async markNotificationsAsRead(userId) {
    const result = await this.notification.update(
      { is_read: true },
      { where: { user_id: userId, is_read: false } }
    );
    if (result[0] === 0) {
      return {
        success: false,
        docExists: false
      };
    }
    return {
      success: true,
      docExists: true,
      affectedRows: result[0]
    };
  }

  // Create a new notification
  async createNotification(data) {
    const result = await this.notification.create(data);
    if (!result) {
      return {
        success: false,
        docExists: false
      };
    }
    return {
      success: true,
      docExists: true,
      doc: result
    };
  }
}

export default NotificationRepo;
