import { ILoginRepository } from "../../../domain/repositories/ILoginRepository";
import { IAuthenticationSecurity } from "../../../domain/contracts/IAuthenticationSecurity";
import { IBcryptSecurity } from "../../../domain/contracts/IBcryptSecurity";
import { AppError, NotFoundError } from "../../../utils/error";

export class SignInUseCase {
  constructor(
    private _loginRepository: ILoginRepository,
    private _authSecurity: IAuthenticationSecurity,
    private _bcryptSecurity: IBcryptSecurity,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this._loginRepository.findUserByEmail(email);

    if (!user) throw new NotFoundError("Usuário");

    const isAuthorization = await this._bcryptSecurity.compare(
      password,
      user.password,
    );

    if (!isAuthorization) throw new AppError("Senha inválida");
    const schemaDatabase = await this._loginRepository.schemaDatabase(email);
    const token = await this._authSecurity.token(schemaDatabase);

    return {
      token,
    };
  }
}
