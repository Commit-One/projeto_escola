import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { StudentDTO, StudentResponseDTO } from "../../dtos/StudentDTO";

export class CreateStudentUseCase {
  constructor(private readonly _repo: IStudentRepository) {}

  async execute(data: StudentDTO): Promise<StudentResponseDTO | null> {
    const created = await this._repo.create(data);
    return created;
  }
}
