import {
  StudentDTO,
  StudentResponseDTO,
} from "../../application/dtos/StudentDTO";
import { StatusEnum } from "../../utils/enum/status";
import { Student } from "../entities/Student";

export interface IStudentRepository {
  create(data: StudentDTO): Promise<StudentResponseDTO | null>;
  update(uuid: string, data: StudentDTO): Promise<Student>;
  updateStatus(uuid: string, status: StatusEnum): Promise<boolean>;
  delete(uuid: string): Promise<boolean>;
  getOne(uuid: string): Promise<StudentResponseDTO | null>;
  getAll(): Promise<StudentResponseDTO[]>;
}
