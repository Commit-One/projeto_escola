import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../../../utils/error";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: ApplicationError.generic.tokenNotFound });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;

    next();
  } catch {
    return res
      .status(401)
      .json({ message: ApplicationError.generic.tokenInvalid });
  }
}
