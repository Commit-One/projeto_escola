import { StatusHTTP } from "../../../utils/enum/statusHTTP";
import { AppError } from "../../../utils/error";
import { Response } from "express";

export class Handler {
  static ok(res: Response, data: unknown) {
    return res.status(StatusHTTP.OK).json(data);
  }

  static created(res: Response, data: unknown) {
    return res.status(StatusHTTP.CREATED).json(data);
  }

  static badRequest(res: Response, message: string) {
    return res.status(StatusHTTP.BAD_REQUEST).json({ message });
  }

  static notFound(res: Response, message: string) {
    return res.status(StatusHTTP.NOT_FOUND).json({ message });
  }

  static internalServerError(res: Response, message: string) {
    return res.status(StatusHTTP.INTERNAL_SERVER_ERROR).json({ message });
  }

  static error(res: Response, err: unknown) {
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
      message: "Ocorreu um erro interno",
    });
  }
}
