import { inject, injectable } from "tsyringe";
import { AcademicCycle } from "../../../domain/entities/AcademicCycle";
import { IAcademicCycleRepository } from "../../../domain/repositories/IAcademicCycleRepository";
import { AcademicCycleDTO } from "../../dtos/academicCycle.dto";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

@injectable()
export class CreateAcademicCycleUseCase {
  constructor(
    @inject(ContainerEnum.ACADEMIC_CYCLE_REPOSITORY)
    private readonly _repo: IAcademicCycleRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(data: AcademicCycleDTO): Promise<AcademicCycle> {
    const created = await this._repo.create(data);

    logger.info({
      message: "AcademicCycle criado com sucesso",
      academicCycleId: created.uuid,
    });

    await this._cache.delete(cacheKeyEnum.ACADEMIC_CYCLE);
    return created;
  }
}
