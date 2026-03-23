import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { TestUseCase } from "../../../application/use-cases/test";
import { injectable } from "tsyringe";

@injectable()
export class TesteController {
  constructor(private readonly _case: TestUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const result = await this._case.execute();
      return Handler.ok(res, result);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
