import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ApplicationError } from "../../../utils/error";

export class UpdatePasswordUseCase {
  constructor(private _repo: IUserRepository) {}

  async execute(password: string, email: string) {
    const saved = await this._repo.updatePassword(password, email);

    if (!saved) new Error(ApplicationError.user.updatePassword);

    return saved;
  }
}
