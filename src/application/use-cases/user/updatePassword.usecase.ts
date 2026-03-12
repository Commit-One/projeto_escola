import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { AppError } from "../../../utils/error";

export class UpdatePasswordUseCase {
  constructor(private _repo: IUserRepository) {}

  async execute(password: string, email: string) {
    const saved = await this._repo.updatePassword(password, email);

    if (!saved) throw new AppError("Erro ao atualizar senha");

    return saved;
  }
}
