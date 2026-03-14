import { inject, injectable } from "tsyringe";
import { IAuthenticationSecurity } from "../../../domain/contracts/IAuthenticationSecurity";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class DecodedUseCase {
  constructor(
    @inject(ContainerEnum.AUTHENTICATION_SECURITY)
    private _authSecurity: IAuthenticationSecurity,
  ) {}

  async execute(token: string): Promise<unknown> {
    const decoded = await this._authSecurity.decoded(token);
    return decoded;
  }
}
