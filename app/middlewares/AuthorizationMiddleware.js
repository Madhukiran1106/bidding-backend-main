// Importing required modules
import jwt from 'jsonwebtoken';
import UserRepo from '../repos/UserRepo.js';
import { config } from '../configs/config.js';

const userRepo = new UserRepo();
// Defining constants and variables
const responseErrorCodes = {
  INVALID_TOKEN: 'AUTH001',
  EXPIRED_TOKEN: 'AUTH002',
  NO_TOKEN: 'AUTH003',
  USER_NOT_FOUND: 'AUTH004',
  SERVER_ERROR: 'AUTH500'
};

// Middleware function
const UserAuth = async (req, res, next) => {
  let token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;
  console.log(config.jwtSecretKey);
  if (!token) {
    return sendErrorResponse(
      res,
      403,
      'Unauthorized user, Access Denied: Token is missing',
      responseErrorCodes.NO_TOKEN
    );
  }
  try {
    const decodeToken = jwt.verify(token, config.jwtSecretKey);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodeToken.exp && decodeToken.exp < currentTimestamp) {
      return sendErrorResponse(
        res,
        401,
        'Token expired',
        responseErrorCodes.EXPIRED_TOKEN
      );
    }
    // Assuming UserDB is a global variable or imported correctly
    const userExists = await userRepo.findUserById(decodeToken.id);
    if (!userExists.success) {
      return sendErrorResponse(
        res,
        403,
        'Unauthorized user, Access Denied: User not found',
        responseErrorCodes.USER_NOT_FOUND
      );
    }
    req.user = decodeToken.id;
    next();
  } catch (error) {
    console.error('Error during token verification:', error.message);
    if (error.name === 'TokenExpiredError') {
      return sendErrorResponse(
        res,
        401,
        'Token expired',
        responseErrorCodes.EXPIRED_TOKEN
      );
    } else if (error.name === 'JsonWebTokenError') {
      return sendErrorResponse(
        res,
        401,
        'Invalid token',
        responseErrorCodes.INVALID_TOKEN
      );
    } else {
      return sendErrorResponse(
        res,
        500,
        'Something went wrong during token verification',
        responseErrorCodes.SERVER_ERROR
      );
    }
  }
};

// Helper function to send error response
function sendErrorResponse(res, statusCode, message, errorCode) {
  const responseCode = errorCode || responseErrorCodes.SERVER_ERROR;
  res.status(statusCode).send({
    message,
    code: responseCode
  });
}

export default UserAuth;
