import bcrypt from "bcrypt";
import { IBcryptSecurity } from "../../domain/contracts/IBcryptSecurity";
import { injectable } from "tsyringe";

@injectable()
export class BcryptSecurity implements IBcryptSecurity {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isAuthorization = await bcrypt.compare(value, hash);
    return isAuthorization;
  }
}
