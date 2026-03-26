import { inject, injectable } from "tsyringe";
import { AcademicCycle } from "../../../domain/entities/AcademicCycle";
import { IAcademicCycleRepository } from "../../../domain/repositories/IAcademicCycleRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

@injectable()
export class GetOneAcademicCycleUseCase {
  constructor(
    @inject(ContainerEnum.ACADEMIC_CYCLE_REPOSITORY)
    private readonly _repo: IAcademicCycleRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<AcademicCycle | null> {
    const academicCache = await this._cache.get<AcademicCycle[]>(
      cacheKeyEnum.ACADEMIC_CYCLE,
    );
    let academc;

    if (!academicCache) academc = await this._repo.getOne(uuid);
    else academc = academicCache.find((s) => s.uuid.includes(uuid));

    return academc ?? null;
  }
}
