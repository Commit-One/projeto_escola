import { StatusEnum } from "../../utils/enum/status";
import { User } from "../entities/User";

export interface IUserRepository {
  getAll(): Promise<{ email: string, status: string }[]>;
  findByEmail(email: string): Promise<User | null>;
  updatePassword(password: string, email: string): Promise<boolean>;
  create(data: User): Promise<User>
  delete(uuid: string): Promise<boolean>
  updateStatus(uuid: string, status: StatusEnum): Promise<boolean>,
  update(uuid: string, data: User): Promise<User>,
}
