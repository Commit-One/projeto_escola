import { inject, injectable } from "tsyringe";
import { ClassPeriod } from "../../../domain/entities/ClassPeriod";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

@injectable()
export class GetOneClassPeriodUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_PERIOD_REPOSITORY)
    private _repo: IClassPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, schoolUuid: string): Promise<ClassPeriod | null> {
    const classPeriodCached = await this._cache.get<ClassPeriod[]>(
      `${cacheKeyEnum.CLASS_PERIOD}:${schoolUuid}`,
    );
    let classPeriod;

    if (!classPeriodCached) classPeriod = await this._repo.getOne(uuid);
    else classPeriod = classPeriodCached.find((s) => s.uuid === uuid);

    return classPeriod ?? null;
  }
}
