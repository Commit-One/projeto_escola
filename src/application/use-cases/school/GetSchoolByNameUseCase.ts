import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";

export class GetSchoolByNameUseCase {
  constructor(private readonly _repo: ISchoolRepository) {}

  async execute(name: string) {
    const school = await this._repo.findByName(name);
    return school;
  }
}
