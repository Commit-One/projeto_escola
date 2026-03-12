import { Request, Response } from "express";
import { handler } from "../statusHttp";
import { SignInUseCase } from "../../../application/use-cases/login/SignInUseCase";
import { DecodedUseCase } from "../../../application/use-cases/login/DecodedUseCase";

export class LoginController {
  constructor(
    private readonly _login: SignInUseCase,
    private readonly _decoded: DecodedUseCase,
  ) {}

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this._login.execute(email, password);

      return handler.ok(res, user);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async decoded(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const user = await this._decoded.execute(token);

      return handler.ok(res, user);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }
}
