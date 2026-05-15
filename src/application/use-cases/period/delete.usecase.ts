import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { PeriodDTO } from "../../dtos/period.dto";
import { Period } from "../../../domain/entities/Period";

@injectable()
export class DeletePeriodUseCase {
  constructor(
    @inject(ContainerEnum.PERIOD_REPOSITORY)
    private readonly _repo: IPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "Período não encontrada",
        mediaId: uuid,
      });

      return false;
    }

    await this._cache.delete(cacheKeyEnum.PERIOD);

    logger.info({
      message: "Período deletado com sucesso",
      mediaId: uuid,
    });

    return true;
  }
}
