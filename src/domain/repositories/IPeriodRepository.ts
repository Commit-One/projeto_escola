import { Period } from "../entities/Period";
import { IBaseRepository } from "./IBaseRepository";

export interface IPeriodRepository extends IBaseRepository<Period> {
  existByName(name: string): Promise<boolean>;
}
