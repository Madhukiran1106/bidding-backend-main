export class AppError extends Error {
  constructor(options) {
    super(options.message);
    this.statusCode = options.statusCode;
    this.status = `${options.statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational =
      options.isOperational !== undefined ? options.isOperational : true;

    if (options.stack) {
      this.stack = options.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
