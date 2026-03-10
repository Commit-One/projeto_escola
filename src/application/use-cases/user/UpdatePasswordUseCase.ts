import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ApplicationError, ValidationError } from "../../../utils/error";

export class UpdatePasswordUseCase {
  constructor(private _repo: IUserRepository) {}

  async execute(password: string, email: string) {
    const saved = await this._repo.updatePassword(password, email);

    if (!saved) throw new ValidationError(ApplicationError.user.updatePassword);

    return saved;
  }
}
