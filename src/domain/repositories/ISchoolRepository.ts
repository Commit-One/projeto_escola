import { SchoolDTO } from "../../application/dtos/SchoolDTO";
import { School } from "../entities/School";

export interface ISchoolRepository {
  getAll(): Promise<School[]>;
  delete(uuid: string): Promise<boolean>;
  update(uuid: string, data: SchoolDTO): Promise<School>;
  findByName(name: string): Promise<School | null>;
  createSchoolAndUser(data: SchoolDTO): Promise<School>;
}
