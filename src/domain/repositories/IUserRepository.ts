import { UserResponseDTO } from "../../application/dtos/UserDTO";
import { User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<void>;
  getAll(): Promise<UserResponseDTO[]>;
  delete(uuid: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  updatePassword(password: string, email: string): Promise<boolean>;
}
