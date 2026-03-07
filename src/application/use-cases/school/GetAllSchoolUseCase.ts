import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";

export class GetAllSchoolUseCase {
  constructor(private readonly _repo: ISchoolRepository) {}

  async execute() {
    const schools = await this._repo.getAll();
    return schools;
  }
}
