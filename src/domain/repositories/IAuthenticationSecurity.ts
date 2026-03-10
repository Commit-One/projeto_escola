import { LoginDTO } from "../../application/dtos/LoginDTO";

export interface IAuthenticationSecurity {
  token(data: LoginDTO): Promise<string>;
  decoded(token: string): Promise<unknown>;
}
