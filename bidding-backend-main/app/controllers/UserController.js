import UserService from '../services/UserService.js';
import { catchAsyncHandler } from '../utils/errors/CatchAsyncError.js';

const userService = new UserService();

class UserController {
  // @POST
  signup = catchAsyncHandler(async (req, res) => {
    const result = await userService.registerUser(req.body);
    return res.status(result.statusCode).send(result.resSend);
  });

  // @POST
  login = catchAsyncHandler(async (req, res) => {
    const result = await userService.loginUser(req.body);
    return res.status(result.statusCode).send(result.resSend);
  });

  // @POST
  profile = catchAsyncHandler(async (req, res) => {
    const result = await userService.getProfile(req.user);
    return res.status(result.statusCode).send(result.resSend);
  });
}

export default new UserController();