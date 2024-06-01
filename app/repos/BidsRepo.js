import BidsDB from '../models/bids.js';

class BidsRepo {
  constructor() {
    this.bids = BidsDB;
  }

  async createBid(data) {
    const result = await this.bids.create(data);
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

  async getBidsByItemId(itemId) {
    const result = await this.bids.findAll({
      where: { item_id: itemId }
    });
    if (result.length === 0) {
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

  async getLastNBids(n) {
    const result = await this.bids.findAll({
      order: [['created_at', 'DESC']],
      limit: n
    });
    if (result.length === 0) {
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

export default BidsRepo;
