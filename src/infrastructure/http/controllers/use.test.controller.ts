import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { CnpjValidator } from "../../../domain/validator/cnpj.validator";

export class TesteController {
  constructor() {}

  async execute(req: Request, res: Response) {
    try {
      const { cnpj } = req.body;
      const result = CnpjValidator.validate(cnpj);
      return Handler.ok(res, result);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
