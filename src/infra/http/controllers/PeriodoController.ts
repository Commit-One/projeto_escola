import { Request, Response } from "express";
import { handler } from "../statusHttp";
import { CreatePeriodoUseCase } from "../../../application/use-cases/periodo/CreatePeriodoUseCase";

export class PeriodoController {
  constructor(private readonly _createPeriodo: CreatePeriodoUseCase) {}

  async create(_: Request, res: Response) {
    try {
      const user = await this._createPeriodo.execute();
      return handler.created(res, user);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }
}
