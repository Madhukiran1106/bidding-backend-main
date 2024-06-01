import ItemDB from '../models/items.js';

class ItemRepo {
  constructor() {
    this.item = ItemDB;
  }

  async createItem(data) {
    const result = await this.item.create(data);
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

  async getAllItems(limit, page) {
    const result = await this.item.findAndCountAll({
      limit: limit,
      offset: page
    });
    return {
      success: true,
      count: result.count,
      doc: result.rows
    };
  }

  async getItemById(id) {
    const item = await this.item.findByPk(id);
    if (!item) {
      return {
        success: false,
        docExists: false
      };
    }
    return {
      success: true,
      docExists: true,
      doc: item
    };
  }

  async updateItem(id, data) {
    const [updated] = await this.item.update(data, {
      where: { id: id }
    });
    if (updated) {
      const updatedItem = await this.getItemById(id);
      return {
        success: true,
        docExists: true,
        doc: updatedItem.doc
      };
    }
    return {
      success: false,
      docExists: false
    };
  }

  async deleteItem(id) {
    const deleted = await this.item.destroy({
      where: { id: id }
    });
    if (deleted) {
      return {
        success: true,
        docExists: true
      };
    }
    return {
      success: false,
      docExists: false
    };
  }
}

export default ItemRepo;
