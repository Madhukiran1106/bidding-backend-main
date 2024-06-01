import express from 'express';
import ItemsController from '../controllers/ItemsController.js';
import UserAuth from '../middlewares/AuthorizationMiddleware.js';
import BidsController from '../controllers/BidsController.js';

const ItemRouter = express.Router();

ItemRouter.route('/')
  .get(ItemsController.getItemsByPagination)
  .post(UserAuth, ItemsController.createItem);
ItemRouter.route('/:id')
  .get(ItemsController.getItemById)
  .put(UserAuth, ItemsController.updateItem)
  .delete(UserAuth, ItemsController.deleteItem);

// Bids related routes;
ItemRouter.route('/:id/bids')
  .get(BidsController.getAllbidsOnItem)
  .post(UserAuth, BidsController.createBidOnItem);

export default ItemRouter;
