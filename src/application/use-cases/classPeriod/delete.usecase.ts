import { inject, injectable } from "tsyringe";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class DeleteClassPeriodUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_PERIOD_REPOSITORY)
    private _repo: IClassPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "Ocorreu um erro ao deletar a regra de classe e período",
        classPeriodUuid: uuid,
      });
      return false;
    }

    await this._cache.delete(cacheKeyEnum.CLASS_PERIOD);

    logger.info({
      message: "Regra de classe e periíodo deletada com sucesso",
      classPeriodUuid: uuid,
    });

    return true;
  }
}
