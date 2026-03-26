import { GradeReporDTO } from "../../application/dtos/gradeReport.dto";
import { NotesDTO } from "../../application/dtos/notes.dto";
import { Notes } from "../entities/Notes";

export interface INotesRepository {
  getAll(): Promise<Notes[]>;
  create(data: NotesDTO): Promise<Notes>;
  delete(uuid: string): Promise<boolean>;
  getOne(uuid: string): Promise<Notes | null>;
  update(uuid: string, data: NotesDTO): Promise<Notes>;
  gradeReport(studentUuid: string): Promise<GradeReporDTO[]>;
}
