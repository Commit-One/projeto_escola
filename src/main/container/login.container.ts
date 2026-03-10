import { DecodedUseCase } from "../../application/use-cases/login/DecodedUseCase";
import { SignInUseCase } from "../../application/use-cases/login/SignInUseCase";
import { LoginTypeOrmRepository } from "../../infra/database/repositories/LoginRepository";
import { LoginController } from "../../infra/http/controllers/LoginController";
import { AuthenticationSecurity } from "../../infra/security/auth";
import { BcryptSecurity } from "../../infra/security/bcrypt";

export const makeLoginContainer = () => {
  const repo = new LoginTypeOrmRepository();
  const authenticationSecurity = new AuthenticationSecurity();
  const bcryptSecurity = new BcryptSecurity();

  const signInUC = new SignInUseCase(repo, authenticationSecurity, bcryptSecurity);
  const decodedUC = new DecodedUseCase(authenticationSecurity);

  const controller = new LoginController(signInUC, decodedUC);

  return controller;
};
