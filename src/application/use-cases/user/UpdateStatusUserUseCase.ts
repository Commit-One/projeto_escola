import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StatusEnum } from "../../../utils/enum/status";

export class UpdateStatusUserUseCase {
  constructor(
    private _repo: IUserRepository,
    private _cache: ICacheService,
  ) {}

  async execute(uuid: string, status: StatusEnum) {
    const updated = await this._repo.updateStatus(uuid, status);
    await this._cache.delete(cacheKeyEnum.USERS);
    return updated;
  }
}
