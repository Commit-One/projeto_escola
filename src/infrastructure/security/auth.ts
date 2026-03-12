import { IAuthenticationSecurity } from "../../domain/contracts/IAuthenticationSecurity";
import { LoginDTO } from "../../application/dtos/LoginDTO";
import jwt from "jsonwebtoken";

export class AuthenticationSecurity implements IAuthenticationSecurity {
  async decoded(token: string): Promise<unknown> {
    const decoded = await jwt.decode(token);
    return decoded;
  }

  async token(data: LoginDTO): Promise<string> {
    const token = jwt.sign(data, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });

    return token;
  }
}
