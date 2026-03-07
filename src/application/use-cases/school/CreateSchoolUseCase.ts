import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { SchoolDTO } from "../../dtos/SchoolDTO";

export class CreateSchoolUseCase {
  constructor(private readonly _repo: ISchoolRepository) {}

  async execute(dto: SchoolDTO): Promise<School> {
    const school = new School(dto.name, dto.address, dto.phone, dto.email);

    await this._repo.createSchoolAndUser(school);

    return school;
  }
}
