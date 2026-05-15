import {
  StatisticsStudentByStatusDTO,
  StudentDTO,
  StudentResponseDTO,
} from "../../application/dtos/student.dto";
import { StatusEnum } from "../../utils/enum/status";

export interface IStudentRepository {
  create(data: StudentDTO): Promise<StudentResponseDTO>;
  getAll(schoolUuid: string): Promise<StudentResponseDTO[]>;
  getOne(uuid: string): Promise<StudentResponseDTO>;
  updateStatus(uuid: string, status: StatusEnum): Promise<boolean>;
  delete(uuid: string): Promise<boolean>;
  update(uuid: string, data: StudentDTO): Promise<StudentResponseDTO>;
  statistics(schoolUuid: string): Promise<StatisticsStudentByStatusDTO>;
}
