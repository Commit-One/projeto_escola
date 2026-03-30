import { Request, Response, NextFunction } from "express";
import { AppError, NotFoundError } from "../../../utils/error";
import { AuthenticationSecurity } from "../../security/auth";
import { StatusHTTP } from "../../../utils/enum/statusHTTP";

export async function authenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(StatusHTTP.UNAUTHORIZED)
      .json({ message: new NotFoundError("Token").response });
  }

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
