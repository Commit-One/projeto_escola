import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { StatusEnum } from "../../../utils/enum/status";
import { ApplicationError } from "../../../utils/error";

export class UpdateStatusUserUseCase {
  constructor(private _repo: IUserRepository) {}

  async execute(uuid: string, status: StatusEnum) {
    const updated = await this._repo.updateStatus(uuid, status);

    if (!updated) new Error(ApplicationError.generic.updateStatus);

    return updated;
  }
}
