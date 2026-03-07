import bcrypt from "bcrypt";
import { IBcryptSecurity } from "../../domain/repositories/IBcryptSecurity";

export class BcryptSecurity implements IBcryptSecurity {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isAuthorization = await bcrypt.compare(value, hash);
    return isAuthorization;
  }
}
