import { ICacheService } from "../../../domain/contracts/ICacheService";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class DeleteClassPeriodUseCase {
  constructor(
    private _repo: IClassPeriodRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);
    await this._cache.delete(cacheKeyEnum.CLASS_PERIOD);
    return deleted;
  }
}
