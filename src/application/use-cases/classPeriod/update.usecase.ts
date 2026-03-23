import { inject, injectable } from "tsyringe";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassPeriodDTO } from "../../dtos/classPeriod.dto";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class UpdateClassPeriodUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_PERIOD_REPOSITORY)
    private _repo: IClassPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, data: ClassPeriodDTO): Promise<boolean> {
    const classPeriod = await this._repo.update(uuid, data);

    if (!classPeriod) {
      logger.warn({
        message: "Ocorreu um erro ao atualizar a regra de classe e período",
        classPeriodUuid: uuid,
      });
      return false;
    }

    await this._cache.delete(cacheKeyEnum.CLASS_PERIOD);

    logger.info({
      message:
        "Atualização da regra de classe e período atualizada com sucesso",
      classPeriodUuid: uuid,
    });

    return true;
  }
}
