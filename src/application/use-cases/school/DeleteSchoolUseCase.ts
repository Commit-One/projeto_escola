import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class DeleteSchoolUseCase {
  constructor(
    private readonly _repo: ISchoolRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);
    if (deleted) await this._cache.delete(cacheKeyEnum.SCHOOLS);
    return deleted;
  }
}
