import BidsService from '../services/BidsService.js';
import { catchAsyncHandler } from '../utils/errors/CatchAsyncError.js';

const bidService = new BidsService();

class BidsController {
  // @POST
  createBidOnItem = catchAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const user = parseInt(req.user);
    const amount = parseInt(req.query.amount);
    const data = {
      item_id: id,
      user_id: user,
      bid_amount: amount
    };
    console.log(data)
    const result = await bidService.placeBidOnItem(data);
    return res.status(result.statusCode).send(result.resSend);
  });

  // @GET
  getAllbidsOnItem = catchAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await bidService.getAllBidsOnItemById(id);
    return res.status(result.statusCode).send(result.resSend);
  });
}

export default new BidsController();
