import { LoginDTO } from "../../application/dtos/LoginDTO";
import { User } from "../entities/User";

export interface ILoginRepository {
  findUserByEmail(email: string): Promise<User | null>;
  schemaDatabase(email: string): Promise<LoginDTO>;
}
