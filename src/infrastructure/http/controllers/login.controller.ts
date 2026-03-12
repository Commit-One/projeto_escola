import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { SignInUseCase } from "../../../application/use-cases/login/signIn.usecase";
import { DecodedUseCase } from "../../../application/use-cases/login/decoded.usecase";

export class LoginController {
  constructor(
    private readonly _login: SignInUseCase,
    private readonly _decoded: DecodedUseCase,
  ) {}

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this._login.execute(email, password);

      return Handler.ok(res, user);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async decoded(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const user = await this._decoded.execute(token);

      return Handler.ok(res, user);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
