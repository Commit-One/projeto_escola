import { Request, Response } from "express";
import { handler } from "../statusHttp";
import { CreateProfileUseCase } from "../../../application/use-cases/profile/CreateProfileUseCase";

export class ProfileController {
  constructor(private readonly _createProfile: CreateProfileUseCase) {}

  async create(_: Request, res: Response) {
    try {
      const user = await this._createProfile.execute();
      return handler.created(res, user);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }
}
