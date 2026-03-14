import { ILoginRepository } from "../../../domain/repositories/ILoginRepository";
import { IAuthenticationSecurity } from "../../../domain/contracts/IAuthenticationSecurity";
import { IBcryptSecurity } from "../../../domain/contracts/IBcryptSecurity";
import { AppError, NotFoundError } from "../../../utils/error";
import { inject, injectable } from "tsyringe";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class SignInUseCase {
  constructor(
    @inject(ContainerEnum.LOGIN_REPOSITORY)
    private _loginRepository: ILoginRepository,

    @inject(ContainerEnum.AUTHENTICATION_SECURITY)
    private _authSecurity: IAuthenticationSecurity,

    @inject(ContainerEnum.BCRYPT_SECURITY)
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
