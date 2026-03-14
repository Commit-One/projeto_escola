import { inject, injectable } from "tsyringe";
import { ClassPeriod } from "../../../domain/entities/ClassPeriod";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";

@injectable()
export class GetAllClassPeriodUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_PERIOD_REPOSITORY)
    private _repo: IClassPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(): Promise<ClassPeriod[]> {
    const cached = await this._cache.get<ClassPeriod[]>(
      cacheKeyEnum.CLASS_PERIOD,
    );

    if (cached) return cached;

    const list = await this._repo.getAll();
    await this._cache.delete(cacheKeyEnum.CLASS_PERIOD);
    return list;
  }
}
