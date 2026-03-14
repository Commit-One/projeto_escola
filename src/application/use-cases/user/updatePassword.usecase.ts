import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { AppError } from "../../../utils/error";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class UpdatePasswordUseCase {
  constructor(
    @inject(ContainerEnum.USER_REPOSITORY)
    private _repo: IUserRepository,
  ) {}

  async execute(password: string, email: string) {
    const saved = await this._repo.updatePassword(password, email);

    if (!saved) throw new AppError("Erro ao atualizar senha");

    return saved;
  }
}
