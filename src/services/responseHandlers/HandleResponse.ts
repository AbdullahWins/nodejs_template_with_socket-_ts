import { Response, Request, NextFunction } from "express";
import { logger } from "../logHandlers/HandleWinston";

interface ResponseData {
  status: number;
  message: string;
  data?: any;
}

class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

const sendResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = null
): Response => {
  const response: ResponseData = {
    status,
    message,
    data,
  };
  return res.status(status).json(response);
};

const sendError = (
  res: Response,
  status: number,
  message: string
): Response => {
  return res.status(status).json({
    status,
    message,
  });
};

const globalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error?.statusCode || 500;

  // Log the error using winston
  logger.error(error?.message, {
    statusCode,
    message: error?.message,
    path: req?.path,
    userId: req?.user?.id,
  });

  sendError(res, statusCode, error?.message);
};

export { sendResponse, sendError, CustomError, globalErrorHandler };
