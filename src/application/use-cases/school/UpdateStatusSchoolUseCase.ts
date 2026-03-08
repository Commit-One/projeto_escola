import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { StatusEnum } from "../../../utils/enum/status";
import { SchoolDTO } from "../../dtos/SchoolDTO";

export class UpdateStatusSchoolUseCase {
  constructor(private readonly _repo: ISchoolRepository) {}

  async execute(uuid: string, status: StatusEnum): Promise<boolean> {
    return await this._repo.updateStatus(uuid, status);
  }
}
