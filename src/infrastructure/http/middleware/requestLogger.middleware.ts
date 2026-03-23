import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger";

export function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now();

  logger.info({
    message: "Chamada API iniciada",
    method: req.method,
    path: req.originalUrl,
    query: req.query,
    params: req.params,
  });

  res.on("finish", () => {
    logger.info({
      message: "Chamada API finalizada",
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
    });
  });

  next();
}
