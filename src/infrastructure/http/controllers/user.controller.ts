import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { GetAllUsersUserCase } from "../../../application/use-cases/user/getAll.usecase";
import { UpdatePasswordUseCase } from "../../../application/use-cases/user/updatePassword.usecase";
import { UpdateStatusUserUseCase } from "../../../application/use-cases/user/updateStatus.usecase";

export class UserController {
  constructor(
    private readonly _getAll: GetAllUsersUserCase,
    private readonly _updatePassword: UpdatePasswordUseCase,
    private readonly _updateStatus: UpdateStatusUserUseCase,
  ) {}

  async getAll(_: Request, res: Response) {
    try {
      const users = await this._getAll.execute();
      return Handler.ok(res, users);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const updated = await this._updatePassword.execute(password, email);
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const { status } = req.body;
      const updated = await this._updateStatus.execute(uuid as string, status);
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
