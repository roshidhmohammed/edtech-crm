import type { NextFunction, Request, Response } from "express";

interface AppError extends globalThis.Error {
  statusCode?: number;
  status?: "fail" | "error";
  code?: number | string;
  keyValue?: Record<string, unknown>;
}

function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      status: "error",
      message: "A record with this value already exists ",
    });
  }

  const statusCode = err.statusCode ?? 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    status: err.status ?? "error",
    message,
  });
}

export default errorHandler;
