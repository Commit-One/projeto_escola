import { UserResponseDTO } from "../../application/dtos/UserDTO";

import { User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<void | boolean>;
  getAll(): Promise<UserResponseDTO[]>;
  findByEmail(email: string): Promise<User | null>;
  updatePassword(password: string, email: string): Promise<boolean>;
}
