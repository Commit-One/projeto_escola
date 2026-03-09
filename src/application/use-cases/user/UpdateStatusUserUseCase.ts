import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ICacheRepository } from "../../../infra/cache/cache.repository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StatusEnum } from "../../../utils/enum/status";
import { ApplicationError } from "../../../utils/error";

export class UpdateStatusUserUseCase {
  constructor(
    private _repo: IUserRepository,
    private _cache: ICacheRepository,
  ) {}

  async execute(uuid: string, status: StatusEnum) {
    const updated = await this._repo.updateStatus(uuid, status);
    await this._cache.delete(cacheKeyEnum.USERS);
    return updated;
  }
}
