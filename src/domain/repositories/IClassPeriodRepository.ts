import { ClassPeriodDTO } from "../../application/dtos/classPeriod.dto";
import { ClassPeriod } from "../entities/ClassPeriod";

export interface IClassPeriodRepository {
  getOne(uuid: string): Promise<ClassPeriod | null>;
  delete(uuid: string): Promise<boolean>;
  getAll(): Promise<ClassPeriod[]>;
  create(data: ClassPeriodDTO): Promise<ClassPeriod>;
  update(uuid: string, data: ClassPeriodDTO): Promise<boolean>;
}
