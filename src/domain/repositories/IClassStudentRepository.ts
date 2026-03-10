import { ClassStudentDTO } from "../../application/dtos/ClassStudentDTO";
import { ClassStudent } from "../entities/ClassStudent";

export interface IClassStudentRepository {
  create(data: ClassStudentDTO): Promise<ClassStudent>;
  getAll(): Promise<ClassStudent[]>;
  getOne(uuid: string): Promise<ClassStudent | null>;
  update(uuid: string, data: ClassStudentDTO): Promise<ClassStudent>;
  delete(uuid: string): Promise<boolean>;
  existByName(name: string): Promise<boolean>;
}
