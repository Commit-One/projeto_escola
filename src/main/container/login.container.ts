import { DecodedUseCase } from "../../application/use-cases/login/DecodedUseCase";
import { SignInUseCase } from "../../application/use-cases/login/SignInUseCase";
import { LoginTypeOrmRepository } from "../../infra/database/repositories/LoginRepository";
import { LoginController } from "../../infra/http/controllers/LoginController";

export const makeLoginContainer = () => {
  const repo = new LoginTypeOrmRepository();
  const signIn = new SignInUseCase(repo);
  const decoded = new DecodedUseCase();
  const controller = new LoginController(signIn, decoded);

  return controller;
};
