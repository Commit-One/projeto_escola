import { StatusCodeEnum } from "../../../utils/enum/statusCode";
import { ApplicationError } from "../../../utils/error";
import { Response } from "express";

export const handler = {
  ok(res: Response, data: unknown) {
    return res.status(StatusCodeEnum.OK).json(data);
  },
  created(res: Response, data: unknown) {
    return res.status(StatusCodeEnum.CREATED).json(data);
  },
  badRequest(res: Response, message: string) {
    return res.status(StatusCodeEnum.BAD_REQUEST).json({ message });
  },
  notFound(res: Response, message: string) {
    return res.status(StatusCodeEnum.NOT_FOUND).json({ message });
  },
  internalServerError(res: Response, message: string) {
    return res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({ message });
  },
  error(res: Response, err: unknown) {
    if (err instanceof Error) {
      return res.status(StatusCodeEnum.BAD_REQUEST).json({
        message: err.message,
      });
    }

    return res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({
      message: ApplicationError.generic.default,
    });
  },
};
