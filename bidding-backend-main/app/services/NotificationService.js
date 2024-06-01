import BidsRepo from '../repos/BidsRepo.js';
import NotificationRepo from '../repos/NotificationRepo.js';

const notificationRepo = new NotificationRepo();
const bidsRepo = new BidsRepo();
class NotificationService {
  // Retrieve notifications for the logged-in user
  async getNotifications(userId) {
    const result = await notificationRepo.getNotificationsByUserId(userId);
    if (!result.success) {
      return {
        statusCode: 201,
        resSend: {
          message: 'No Notifications Found',
          status: '0'
        }
      };
    }
    return {
      statusCode: 200,
      resSend: {
        message: 'Notifications Retrieved Successfully',
        status: '1',
        data: result.doc
      }
    };
  }

  // Mark notifications as read
  async markNotificationsAsRead(userId) {
    const result = await notificationRepo.markNotificationsAsRead(userId);
    if (!result.success) {
      return {
        statusCode: 404,
        resSend: {
          message: 'No Notifications Found to Mark as Read',
          status: '0'
        }
      };
    }
    return {
      statusCode: 200,
      resSend: {
        message: 'Notifications Marked as Read Successfully',
        status: '1',
        affectedRows: result.affectedRows
      }
    };
  }

  /**
   * Socket related methods
   */
  async ioNotifyTheLastNBids(n) {
    const result = await bidsRepo.getLastNBids(n);
    if (!result.success) {
      return {
        bids: 'None',
        success: false
      };
    }
    const formattedBids = result.doc.map(bid => {
      const date = new Date(bid.created_at).toLocaleString();
      return `Bid ID: ${bid.id}, Item ID: ${bid.item_id}, User ID: ${bid.user_id}, Bid Amount: ${bid.bid_amount}, Created At: ${date}`;
    }).join('\n');
    return {
      bids : formattedBids,
      success: true
    }
  }
}

export default NotificationService;
