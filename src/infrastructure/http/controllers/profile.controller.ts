import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { CreateProfileUseCase } from "../../../application/use-cases/profile/create.usecase";
import { injectable } from "tsyringe";

@injectable()
export class ProfileController {
  constructor(private readonly _create: CreateProfileUseCase) {}

  async create(_: Request, res: Response) {
    try {
      const user = await this._create.execute();
      return Handler.created(res, user);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
