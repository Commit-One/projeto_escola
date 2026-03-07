import { IAuthenticationSecurity } from "../../domain/repositories/IAuthenticationSecurity";
import { LoginDTO } from "../../application/dtos/LoginDTO";
import jwt from "jsonwebtoken";
import { EnvironmentConfig } from "../config";

const environment = new EnvironmentConfig();

export class AuthenticationSecurity implements IAuthenticationSecurity {
  async decoded(token: string): Promise<unknown> {
    const decoded = await jwt.decode(token);
    return decoded;
  }

  async token(data: LoginDTO): Promise<string> {
    const token = jwt.sign(data, environment.JWT_SECRET as string, {
      expiresIn: environment.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });

    return token;
  }
}
