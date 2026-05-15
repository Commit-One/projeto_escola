import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";
import { AppError } from "../../../utils/error";

@injectable()
export class CreatePeriodUseCase {
  constructor(
    @inject(ContainerEnum.PERIOD_REPOSITORY)
    private _periodRepository: IPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(name: string, schoolUuid: string): Promise<boolean> {
    const isExist = await this._periodRepository.existByName(name);

    if (isExist) {
      logger.warn("Período já cadastrado");
      new AppError("Período já cadastrado");
    }

    await this._periodRepository.create(name, schoolUuid);
    await this._cache.delete(cacheKeyEnum.PERIOD);

    logger.info({ message: "Período criado com sucesso" });

    return true;
  }
}
