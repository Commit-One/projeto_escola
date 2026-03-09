import { DecodedUseCase } from "../../application/use-cases/login/DecodedUseCase";
import { SignInUseCase } from "../../application/use-cases/login/SignInUseCase";
import { LoginTypeOrmRepository } from "../../infra/database/repositories/LoginRepository";
import { LoginController } from "../../infra/http/controllers/LoginController";

export const makeLoginContainer = () => {
  const repo = new LoginTypeOrmRepository();

  const signInUC = new SignInUseCase(repo);
  const decodedUC = new DecodedUseCase();

  const controller = new LoginController(signInUC, decodedUC);

  return controller;
};
