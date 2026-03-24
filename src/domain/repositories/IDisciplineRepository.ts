import { Discipline } from "../entities/Discipline";

export interface IDisciplineRepository {
  getAll(): Promise<Discipline[]>;
  delete(uuid: string): Promise<boolean>;
  create(name: string, schoolUuid: string): Promise<Discipline>;
  getOne(uuid: string): Promise<Discipline | null>;
  update(uuid: string, name: string): Promise<Discipline>;
}
