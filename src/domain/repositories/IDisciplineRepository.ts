import { DisciplineDTO } from "../../application/dtos/discipline.dto";
import { Discipline } from "../entities/Discipline";

export interface IDisciplineRepository {
  getAll(schoolUuid: string): Promise<Discipline[]>;
  delete(uuid: string): Promise<boolean>;
  create(data: DisciplineDTO): Promise<Discipline>;
  getOne(uuid: string): Promise<Discipline | null>;
  update(uuid: string, data: DisciplineDTO): Promise<Discipline>;
}
