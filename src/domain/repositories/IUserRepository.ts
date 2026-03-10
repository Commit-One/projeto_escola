import { UserResponseDTO } from "../../application/dtos/UserDTO";

import { User } from "../entities/User";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserRepository extends IBaseRepository<User> {
  getAll(): Promise<UserResponseDTO[]>;
  findByEmail(email: string): Promise<User | null>;
  updatePassword(password: string, email: string): Promise<boolean>;
}
