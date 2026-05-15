import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { PeriodEntity } from "../../../infrastructure/database/entities/PeriodEntity";

@injectable()
export class GetAllPeriodUseCase {
  constructor(
    @inject(ContainerEnum.PERIOD_REPOSITORY)
    private _repo: IPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(schoolUuid: string): Promise<PeriodEntity[]> {
    const cached = await this._cache.get<PeriodEntity[]>(cacheKeyEnum.PERIOD);

    if (cached) return cached.filter((c) => c.schoolUuid === schoolUuid);

    const list = await this._repo.getAll(schoolUuid);
    await this._cache.set(cacheKeyEnum.PERIOD, list);
    return list ?? [];
  }
}
