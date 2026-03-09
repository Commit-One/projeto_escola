import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { StatusEnum } from "../../../utils/enum/status";

export class UpdateStatusStudentUseCase {
  constructor(private readonly _repo: IStudentRepository) {}

  async execute(uuid: string, status: StatusEnum): Promise<boolean> {
    console.log(status);
    const updated = await this._repo.updateStatus(uuid, status);
    return updated;
  }
}
