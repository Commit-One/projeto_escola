import { LoginDTO } from "../../application/dtos/login.dto";

export interface IAuthenticationSecurity {
  token(data: LoginDTO): Promise<string>;
  decoded(token: string): Promise<unknown>;
}
