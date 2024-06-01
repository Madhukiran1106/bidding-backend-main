import ItemRepo from '../repos/ItemsRepo.js';

const itemRepo = new ItemRepo();

class ItemService {
  async getAuctionItems(limit, page) {
    const result = await itemRepo.getAllItems(limit, page);
    if (!result.success) {
      return {
        statusCode: 500,
        resSend: {
          message: 'Error Finding Auction Items',
          status: '-1'
        }
      };
    }
    if (result.count === 0) {
      return {
        statusCode: 200,
        resSend: {
          message: 'No Auction Items Found',
          status: '0'
        }
      };
    }
    return {
      statusCode: 200,
      resSend: {
        message: 'Auction Items Found',
        status: '1',
        data: result.doc
      }
    };
  }

  async getAuctionItemById(id) {
    const result = await itemRepo.getItemById(id);
    if (!result.success) {
      return {
        statusCode: 404,
        resSend: {
          message: 'No Auction Item Found by this id',
          status: '0'
        }
      };
    }
    return {
      statusCode: 200,
      resSend: {
        message: 'Auction Item Found',
        status: '1',
        data: result.doc
      }
    };
  }

  async createAuctionItem(data) {
    const result = await itemRepo.createItem(data);
    if (!result.success) {
      return {
        statusCode: 400,
        resSend: {
          message: 'Error Creating Auction Item',
          status: '-1'
        }
      };
    }
    return {
      statusCode: 201,
      resSend: {
        message: 'Auction Item Created Successfully',
        status: '1',
        data: result.doc
      }
    };
  }

  async updateAuctionItem(id, data) {
    const result = await itemRepo.updateItem(id, data);
    if (!result.success) {
      return {
        statusCode: 400,
        resSend: {
          message: 'Error Updating Auction Item',
          status: '-1'
        }
      };
    }
    return {
      statusCode: 200,
      resSend: {
        message: 'Auction Item Updated Successfully',
        status: '1',
        data: result.doc
      }
    };
  }

  async deleteAuctionItem(id) {
    const result = await itemRepo.deleteItem(id);
    if (!result.success) {
      return {
        statusCode: 400,
        resSend: {
          message: 'Error Deleting Auction Item',
          status: '-1'
        }
      };
    }
    return {
      statusCode: 200,
      resSend: {
        message: 'Auction Item Deleted Successfully',
        status: '1'
      }
    };
  }
}

export default ItemService;
