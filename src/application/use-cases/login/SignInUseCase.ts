import { ILoginRepository } from "../../../domain/repositories/ILoginRepository";
import { IAuthenticationSecurity } from "../../../domain/repositories/IAuthenticationSecurity";
import { IBcryptSecurity } from "../../../domain/repositories/IBcryptSecurity";
import { ApplicationError, ValidationError } from "../../../utils/error";

export class SignInUseCase {
  constructor(
    private _loginRepository: ILoginRepository,
    private _authSecurity: IAuthenticationSecurity,
    private _bcryptSecurity: IBcryptSecurity,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this._loginRepository.findUserByEmail(email);

    if (!user) throw new ValidationError(ApplicationError.user.notFound);

    const isAuthorization = await this._bcryptSecurity.compare(
      password,
      user.password,
    );

    if (!isAuthorization) throw new ValidationError(ApplicationError.user.passwordCompare);

    const schemaDatabase = await this._loginRepository.schemaDatabase(email);

    const token = await this._authSecurity.token(schemaDatabase);

    return {
      token,
    };
  }
}
