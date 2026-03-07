import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { SchoolDTO } from "../../dtos/SchoolDTO";

export class UpdateSchoolUseCase {
  constructor(private readonly _repo: ISchoolRepository) {}

  async execute(uuid: string, data: SchoolDTO): Promise<School> {
    return await this._repo.update(uuid, data);
  }
}
