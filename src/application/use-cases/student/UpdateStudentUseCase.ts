import { Student } from "../../../domain/entities/Student";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { StudentDTO } from "../../dtos/StudentDTO";

export class UpdateStudentUseCase {
  constructor(private readonly _repo: IStudentRepository) {}

  async execute(uuid: string, data: StudentDTO): Promise<Student> {
    const updated = await this._repo.update(uuid, data);
    return updated;
  }
}
