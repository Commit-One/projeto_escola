import { StatusHTTP } from "../../../utils/enum/statusHTTP";
import { AppError, ApplicationError } from "../../../utils/error";
import { Response } from "express";

export const handler = {
  ok(res: Response, data: unknown) {
    return res.status(StatusHTTP.OK).json(data);
  },
  created(res: Response, data: unknown) {
    return res.status(StatusHTTP.CREATED).json(data);
  },
  badRequest(res: Response, message: string) {
    return res.status(StatusHTTP.BAD_REQUEST).json({ message });
  },
  notFound(res: Response, message: string) {
    return res.status(StatusHTTP.NOT_FOUND).json({ message });
  },
  internalServerError(res: Response, message: string) {
    return res.status(StatusHTTP.INTERNAL_SERVER_ERROR).json({ message });
  },
  error(res: Response, err: unknown) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    if (err instanceof Error) {
      return res.status(StatusHTTP.BAD_REQUEST).json({
        message: err.message,
      });
    }

    return res.status(StatusHTTP.INTERNAL_SERVER_ERROR).json({
      message: ApplicationError.generic.default,
    });
  },
};
