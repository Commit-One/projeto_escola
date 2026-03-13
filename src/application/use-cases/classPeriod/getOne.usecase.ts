import { ICacheService } from "../../../domain/contracts/ICacheService";
import { ClassPeriod } from "../../../domain/entities/ClassPeriod";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class GetOneClassPeriodUseCase {
  constructor(
    private _repo: IClassPeriodRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(uuid: string): Promise<ClassPeriod | null> {
    const classPeriodCached = await this._cache.get<ClassPeriod[]>(
      cacheKeyEnum.CLASS_PERIOD,
    );
    let classPeriod;

    if (!classPeriodCached) classPeriod = await this._repo.getOne(uuid);
    else classPeriod = classPeriodCached.find((s) => s.uuid.includes(uuid));

    return classPeriod ?? null;
  }
}
