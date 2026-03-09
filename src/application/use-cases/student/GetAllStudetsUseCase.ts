import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { StudentResponseDTO } from "../../dtos/StudentDTO";

export class GetAllStudetsUseCase {
  constructor(private readonly _repo: IStudentRepository) {}

  async execute(): Promise<StudentResponseDTO[]> {
    const students = await this._repo.getAll();
    return students;
  }
}
