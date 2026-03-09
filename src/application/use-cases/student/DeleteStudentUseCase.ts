import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";

export class DeleteStudentUseCase {
  constructor(private readonly _repo: IStudentRepository) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);
    return deleted;
  }
}
