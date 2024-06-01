import {
  handleCastErrorDB,
  handleDuplicateFieldDB,
  handleJWTError,
  handleJWTExpiredTokenError,
  handleValidationErrorDB,
  sendErrorDev,
  sendErrorProd,
} from "../utils/errors/CustomExceptions.js";

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredTokenError();
    sendErrorProd(err, res);
  }
};
