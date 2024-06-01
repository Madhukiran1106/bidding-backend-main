import BidsRepo from '../repos/BidsRepo.js';
import ItemRepo from '../repos/ItemsRepo.js';

const bidsRepo = new BidsRepo();
const itemsRepo = new ItemRepo();

class BidsService {
  async getAllBidsOnItemById(itemId) {
    const result = await bidsRepo.getBidsByItemId(itemId);
    if (!result.success) {
      return {
        statusCode: 201,
        resSend: {
          message: 'No Bids Found',
          status: '0'
        }
      };
    }
    return {
      statusCode: 200,
      resSend: {
        message: 'All Bis on these Item Id',
        status: '1',
        data: result.doc
      }
    };
  }

  async placeBidOnItem(data) {
    const result = await bidsRepo.createBid(data);
    if (!result.success) {
      return {
        statusCode: 400,
        resSend: {
          message: 'Error Creating Bid',
          status: '0'
        }
      };
    }
    await itemsRepo.updateItem(data.item_id, {
      current_price: data.bid_amount
    });
    return {
      statusCode: 200,
      resSend: {
        message: 'Bid Created Successfully',
        status: '1',
        data: result.doc
      }
    };
  }

  /**
   * Real time biding services functions for socket io
   */

  async ioPlaceBidOnItem(userID, itemId, bid_amount) {
    const item = await itemsRepo.getItemById(itemId);
    if (!item.success) {
      return {
        message: 'Item not found for Biding!',
        success: false
      };
    }
    if (item.doc.current_price >= bid_amount) {
      return {
        message: `Bid amount should be greater than current price ${item.doc.current_price}!`,
        success: false
      };
    }
    const data = {
      item_id: itemId,
      user_id: userID,
      bid_amount: bid_amount
    };
    const result = await bidsRepo.createBid(data);
    if (!result.success) {
      return {
        message: 'Error while creating bid!',
        success: false
      };
    }
    await itemsRepo.updateItem(data.item_id, {
      current_price: data.bid_amount
    });
    return {
      message: `Someone placed new bided for an item with id : ${data.item_id} by user id : ${userID} with bid amount ${data.bid_amount}!`,
      success: true
    };
  }
  
}

export default BidsService;
