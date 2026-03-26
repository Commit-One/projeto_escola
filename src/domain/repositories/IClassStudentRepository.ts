import { IClassStudentDTO } from "../../application/dtos/classStudent.dto";
import { StatusEnum } from "../../utils/enum/status";
import { ClassStudent } from "../entities/ClassStudent";

export interface IClassStudentRepository {
  getAll(): Promise<ClassStudent[]>;
  existByName(name: string): Promise<boolean>;
  create(data: IClassStudentDTO): Promise<ClassStudent>;
  getOne(uuid: string): Promise<ClassStudent | null>;
  updateStatus(uuid: string, status: StatusEnum): Promise<boolean>;
  delete(uuid: string): Promise<boolean>;
  update(uuid: string, data: IClassStudentDTO): Promise<ClassStudent>;
}
