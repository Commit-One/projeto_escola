import {
  StudentDTO,
  StudentResponseDTO,
} from "../../application/dtos/StudentDTO";
import { StatusEnum } from "../../utils/enum/status";

export interface IStudentRepository {
  create(data: StudentDTO): Promise<StudentResponseDTO>;
  getAll(): Promise<StudentResponseDTO[]>;
  getOne(uuid: string): Promise<StudentResponseDTO>;
  updateStatus(uuid: string, status: StatusEnum): Promise<boolean>;
  delete(uuid: string): Promise<boolean>;
  update(uuid: string, data: StudentDTO): Promise<StudentResponseDTO>;
}
