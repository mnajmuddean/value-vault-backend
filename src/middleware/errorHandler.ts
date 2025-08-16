import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";
import { ApiResponse } from "@/utils/apiResponse";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error({
    message: error.message,
    stack: error.stack,
    context: "ErrorHandler",
  });

  if (error instanceof AppError) {
    ApiResponse.error(res, error.message, error.statusCode);
    return;
  }

  ApiResponse.error(res, "Internal server error", 500);
};
