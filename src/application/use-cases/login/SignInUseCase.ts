import { ILoginRepository } from "../../../domain/repositories/ILoginRepository";
import { AuthenticationSecurity } from "../../../infra/security/auth";
import { BcryptSecurity } from "../../../infra/security/bcrypt";
import { ApplicationError } from "../../../utils/error";

export class SignInUseCase {
  private jwt;

  constructor(private _loginRepository: ILoginRepository) {
    this.jwt = new AuthenticationSecurity();
  }

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this._loginRepository.findUserByEmail(email);

    if (!user) throw new Error(ApplicationError.user.notFound);

    const bycrpty = new BcryptSecurity();
    const isAuthorization = bycrpty.compare(password, user.password);

    if (!isAuthorization) new Error(ApplicationError.user.passawordCompare);

    const schemaDatabase = await this._loginRepository.schemaDatabase(email);

    const token = await this.jwt.token(schemaDatabase);

    return {
      token,
    };
  }

  async decoded(token: string): Promise<unknown> {
    const decoded = await this.jwt.decoded(token);
    return decoded;
  }
}
