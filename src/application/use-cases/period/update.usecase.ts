import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { PeriodDTO } from "../../dtos/period.dto";
import { Period } from "../../../domain/entities/Period";

@injectable()
export class UpdatePeriodUseCase {
  constructor(
    @inject(ContainerEnum.PERIOD_REPOSITORY)
    private readonly _repo: IPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, data: PeriodDTO): Promise<Period | null> {
    const item = await this._repo.update(uuid, data);

    if (!item) {
      logger.warn({
        message:
          "Ocorreu um erro ao realizar o update do período. Registro não encontrado",
        mediaId: uuid,
      });

      return item;
    }

    await this._cache.delete(cacheKeyEnum.PERIOD);

    logger.info({
      message: "Período atualizado com sucesso",
      mediaId: uuid,
    });

    return item;
  }
}
