import { StudentDisciplineDTO } from "../../application/dtos/studentDiscipline.dto";
import { StudentDiscipline } from "../entities/StudentDiscipline";

export interface IStudentDisciplineRepository {
  getAll(): Promise<StudentDiscipline[]>;
  create(data: StudentDisciplineDTO): Promise<StudentDiscipline>;
  delete(uuid: string): Promise<boolean>;
  getOne(uuid: string): Promise<StudentDiscipline | null>;
  update(uuid: string, data: StudentDisciplineDTO): Promise<StudentDiscipline>;
}
