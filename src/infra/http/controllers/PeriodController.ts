import { Request, Response } from "express";
import { handler } from "../statusHttp";
import { CreatePeriodUseCase } from "../../../application/use-cases/period/CreatePeriodoUseCase";

export class PeriodController {
  constructor(private readonly _createPeriodo: CreatePeriodUseCase) {}

  async create(_: Request, res: Response) {
    try {
      const user = await this._createPeriodo.execute();
      return handler.created(res, user);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }
}
