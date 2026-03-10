import { Profile } from "../entities/Profile";
import { IBaseRepository } from "./IBaseRepository";

export interface IProfileRepository extends IBaseRepository<Profile> {
  existByName(name: string): Promise<boolean>;
}
