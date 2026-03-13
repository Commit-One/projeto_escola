import { DecodedUseCase } from "../../application/use-cases/login/decoded.usecase";
import { SignInUseCase } from "../../application/use-cases/login/signIn.usecase";
import { LoginTypeOrmRepository } from "../../infrastructure/database/repositories/login.repository";
import { LoginController } from "../../infrastructure/http/controllers/login.controller";
import { AuthenticationSecurity } from "../../infrastructure/security/auth";
import { BcryptSecurity } from "../../infrastructure/security/bcrypt";

export class MakeLoginContainer {
  public static inicialize() {
    const repo = new LoginTypeOrmRepository();
    const authenticationSecurity = new AuthenticationSecurity();
    const bcryptSecurity = new BcryptSecurity();

    const signInUC = new SignInUseCase(
      repo,
      authenticationSecurity,
      bcryptSecurity,
    );
    const decodedUC = new DecodedUseCase(authenticationSecurity);

    const controller = new LoginController(signInUC, decodedUC);

    return controller;
  }
}
