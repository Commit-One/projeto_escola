import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger";

export function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  const statusCode = error?.statusCode || 500;

  logger.error({
    message: "Erro na API",
    method: req.method,
    path: req.originalUrl,
    statusCode,
    error: error?.message,
    stack: error?.stack,
  });

  return res.status(statusCode).json({
    message: error?.message || "Erro interno do servidor",
  });
}
