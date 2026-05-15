import { PeriodDTO } from "../../application/dtos/period.dto";
import { PeriodEntity } from "../../infrastructure/database/entities/PeriodEntity";
import { Period } from "../entities/Period";

export interface IPeriodRepository {
  create(name: string, schoolUuid: string): Promise<boolean>;
  existByName(name: string): Promise<boolean>;
  getAll(schoolUuid: string): Promise<PeriodEntity[] | null>;
  update(uuid: string, data: PeriodDTO): Promise<Period | null>;
  delete(uuid: string): Promise<boolean>;
}
