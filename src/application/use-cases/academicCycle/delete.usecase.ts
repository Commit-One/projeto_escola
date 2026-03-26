import { inject, injectable } from "tsyringe";
import { IAcademicCycleRepository } from "../../../domain/repositories/IAcademicCycleRepository";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class DeleteAcademicCycleUseCase {
  constructor(
    @inject(ContainerEnum.ACADEMIC_CYCLE_REPOSITORY)
    private readonly _repo: IAcademicCycleRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "AcademicCycle não encontrado",
        academicCycleId: uuid,
      });

      return false;
    }

    await this._cache.delete(cacheKeyEnum.ACADEMIC_CYCLE);

    logger.info({
      message: "AcademicCycle deletado com sucesso",
      academicCycleId: uuid,
    });

    return true;
  }
}
