import { LoginDTO } from "../../application/dtos/login.dto";
import { User } from "../entities/User";

export interface ILoginRepository {
  findUserByEmail(email: string): Promise<User | null>;
  schemaDatabase(email: string): Promise<LoginDTO>;
  updateLastAccess(email: string): Promise<boolean>;
}
