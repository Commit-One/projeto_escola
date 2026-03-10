import { IAuthenticationSecurity } from "../../../domain/repositories/IAuthenticationSecurity";

export class DecodedUseCase {
  constructor(private _authSecurity: IAuthenticationSecurity) {}

  async execute(token: string): Promise<unknown> {
    const decoded = await this._authSecurity.decoded(token);
    return decoded;
  }
}
