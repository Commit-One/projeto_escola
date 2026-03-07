import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";

export class DeleteSchoolUseCase {
  constructor(private readonly _repo: ISchoolRepository) {}

  async execute(uuid: string): Promise<boolean> {
    return await this._repo.delete(uuid);
  }
}
