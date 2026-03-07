import { ILoginRepository } from "../../../domain/repositories/ILoginRepository";
import { AuthenticationSecurity } from "../../../infra/security/auth";

export class DecodedUseCase {
  private jwt;

  constructor() {
    this.jwt = new AuthenticationSecurity();
  }

  async execute(token: string): Promise<unknown> {
    const decoded = await this.jwt.decoded(token);
    return decoded;
  }
}
