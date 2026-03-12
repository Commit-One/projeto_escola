import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { CreatePeriodUseCase } from "../../../application/use-cases/period/create.usecase";

export class PeriodController {
  constructor(private readonly _create: CreatePeriodUseCase) {}

  async create(_: Request, res: Response) {
    try {
      const user = await this._create.execute();
      return Handler.created(res, user);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
