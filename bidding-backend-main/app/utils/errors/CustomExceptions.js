import winston from "winston";
import { AppError } from "./AppError.js";
/**
 * You can add your custom exceptions here and update
 * in the error handling Middleware
 */

// Logger configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "your-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

export const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  logger.error(`Cast Error: ${message}`);
  return new AppError({ message, statusCode: 400 });
};

export const handleDuplicateFieldDB = (err) => {
  const value = err.errmsg.match(/"(.*?)"/)[1];
  const message = `Duplicate Field Value: ${value}. Please use another value`;
  logger.error(`Duplicate Field Error: ${message}`);
  return new AppError({ message, statusCode: 400 });
};

export const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input Data. ${errors.join(". ")}`;
  logger.error(`Validation Error: ${message}`);
  return new AppError({ message, statusCode: 400 });
};

export const handleJWTError = () => {
  const message = "Invalid token. Please log in again";
  logger.error(`JWT Error: ${message}`);
  return new AppError({ message, statusCode: 401 });
};

export const handleJWTExpiredTokenError = () => {
  const message = "Your token expired. Please log in again";
  logger.error(`JWT Expired Error: ${message}`);
  return new AppError({ message, statusCode: 401 });
};

export const sendErrorDev = (err, res) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    const options = {
      message: err.message,
      statusCode: 500,
      stack: err.stack,
    };
    const appError = new AppError(options);
    res.status(appError.statusCode).json({
      status: appError.status,
      error: appError,
      message: appError.message,
      stack: appError.stack,
    });
  }
};

export const sendErrorProd = (err, res) => {
  if (err instanceof AppError) {
    // Operational Errors to send client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // For programming or unknown errors
      // Log Error
      logger.error("Unhandled Error:", err);

      // Send Generic Response
      res.status(500).json({
        status: "error",
        message: "Something went wrong..!!",
      });
    }
  } else {
    // For programming or unknown errors
    // Log Error
    logger.error("Unhandled Error:", err);

    // Send Generic Response
    res.status(500).json({
      status: "error",
      message: "Something went wrong..!!",
    });
  }
};
