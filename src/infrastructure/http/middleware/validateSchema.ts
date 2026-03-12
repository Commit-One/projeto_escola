import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateMiddlewareSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
      });

      next();
    } catch (error: any) {
      return res.status(400).json({
        message: "Ocorre um erro interno",
        errors: error?.flatten ? error.flatten() : error,
      });
    }
  };
};
