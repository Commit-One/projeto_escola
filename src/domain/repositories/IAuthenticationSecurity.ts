import { LoginDTO } from "../../application/dtos/LoginDTO";

export interface IAuthenticationSecurity {
  token(data: LoginDTO): Promise<unknown>;
  decoded(token: string): Promise<unknown>;
}
