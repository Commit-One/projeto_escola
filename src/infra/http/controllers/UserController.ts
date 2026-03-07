import { Request, Response } from "express";
import { handler } from "../statusCode";
import { GetAllUsersUserCase } from "../../../application/use-cases/user/GetAllUsersUseCase";
import { UpdatePasswordUseCase } from "../../../application/use-cases/user/UpdatePasswordUseCase";

export class UserController {
  constructor(
    private readonly _getAllUser: GetAllUsersUserCase,
    private readonly _updatePasswordUser: UpdatePasswordUseCase,
  ) {}

  async getAll(_: Request, res: Response) {
    try {
      const users = await this._getAllUser.execute();
      return handler.ok(res, users);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const updated = await this._updatePasswordUser.execute(password, email);
      return handler.ok(res, updated);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }
}
