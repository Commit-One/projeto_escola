import { SchoolDTO } from "../../application/dtos/SchoolDTO";
import { StatusEnum } from "../../utils/enum/status";
import { School } from "../entities/School";

export interface ISchoolRepository {
  updateStatus(uuid: string, status: StatusEnum): Promise<boolean>;
  createSchoolUserTransaction(data: SchoolDTO): Promise<School>;
  getAll(): Promise<School[]>;    
  findByName(name: string): Promise<School | null>;  
  delete(uuid: string): Promise<boolean>
  update(uuid: string, data: SchoolDTO): Promise<School>
}
