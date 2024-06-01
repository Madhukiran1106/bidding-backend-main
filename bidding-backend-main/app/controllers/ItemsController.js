import ItemService from '../services/ItemsService.js';
import { catchAsyncHandler } from '../utils/errors/CatchAsyncError.js';

const itemService = new ItemService();

class ItemsController {
  // @GET
  getItemsByPagination = catchAsyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 0;
    const result = await itemService.getAuctionItems(limit, page);
    return res.status(result.statusCode).send(result.resSend);
  });

  // @GET
  getItemById = catchAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await itemService.getAuctionItemById(id);
    return res.status(result.statusCode).send(result.resSend);
  });

  // @POST
  createItem = catchAsyncHandler(async (req, res) => {
    const result = await itemService.createAuctionItem(req.body);
    return res.status(result.statusCode).send(result.resSend);
  });

  // @PUT
  updateItem = catchAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await itemService.updateAuctionItem(id, req.body);
    return res.status(result.statusCode).send(result.resSend);
  });

  // @DELETE
  deleteItem = catchAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await itemService.deleteAuctionItem(id);
    return res.status(result.statusCode).send(result.resSend);
  });
}

export default new ItemsController();
