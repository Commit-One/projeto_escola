import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { StudentResponseDTO } from "../../dtos/StudentDTO";

export class GetOneStudentUseCase {
  constructor(private readonly _repo: IStudentRepository) {}

  async execute(uuid: string): Promise<StudentResponseDTO | null> {
    return await this._repo.getOne(uuid);
  }
}
