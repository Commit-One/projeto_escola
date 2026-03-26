import { inject, injectable } from "tsyringe";
import { AcademicCycle } from "../../../domain/entities/AcademicCycle";
import { IAcademicCycleRepository } from "../../../domain/repositories/IAcademicCycleRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

@injectable()
export class GetAllAcademicCycleUseCase {
  constructor(
    @inject(ContainerEnum.ACADEMIC_CYCLE_REPOSITORY)
    private readonly _repo: IAcademicCycleRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(): Promise<AcademicCycle[]> {
    const cached = await this._cache.get<AcademicCycle[]>(
      cacheKeyEnum.ACADEMIC_CYCLE,
    );

    if (cached) return cached;

    const list = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.ACADEMIC_CYCLE, list);
    return list;
  }
}
