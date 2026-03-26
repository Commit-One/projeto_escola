import { AcademicCycleDTO } from "../../application/dtos/academicCycle.dto";
import { AcademicCycle } from "../entities/AcademicCycle";

export interface IAcademicCycleRepository {
  getOne(uuid: string): Promise<AcademicCycle | null>;
  delete(uuid: string): Promise<boolean>;
  getAll(): Promise<AcademicCycle[]>;
  create(data: AcademicCycleDTO): Promise<AcademicCycle>;
  update(uuid: string, data: AcademicCycleDTO): Promise<AcademicCycle | null>;
}
