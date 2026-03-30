import { EmployeeDTO } from "../../application/dtos/employee.dto";
import { StatusEnum } from "../../utils/enum/status";
import { Employee } from "../entities/Employee";

export interface IEmployeeRepository {
  getOne(uuid: string): Promise<Employee | null>;
  delete(uuid: string): Promise<boolean>;
  getAll(): Promise<Employee[]>;
  create(data: EmployeeDTO): Promise<Employee>;
  update(uuid: string, data: EmployeeDTO): Promise<Employee | null>;
  updateStatus(uuid: string, status: StatusEnum): Promise<boolean>;
}
