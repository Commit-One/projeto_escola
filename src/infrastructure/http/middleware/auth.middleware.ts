import { Request, Response, NextFunction } from "express";
import { AppError, NotFoundError } from "../../../utils/error";
import { AuthenticationSecurity } from "../../security/auth";
import { StatusHTTP } from "../../../utils/enum/statusHTTP";

export async function isAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(StatusHTTP.UNAUTHORIZED)
      .json({ message: new NotFoundError("Token").response });
  }

  // Remove "Bearer " do header se existir
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = await new AuthenticationSecurity().decoded(token);
    (req as any).user = decoded;

    next();
  } catch {
    return res
      .status(StatusHTTP.UNAUTHORIZED)
      .json({ message: new AppError("Token inválido") });
  }
}
