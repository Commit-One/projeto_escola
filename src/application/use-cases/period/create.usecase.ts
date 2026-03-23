import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class CreatePeriodUseCase {
  constructor(
    @inject(ContainerEnum.PERIOD_REPOSITORY)
    private _periodRepository: IPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(): Promise<boolean> {
    const listPeriod = ["Manhã", "Tarde", "Noite"];

    for (const p of listPeriod) {
      const isExist = await this._periodRepository.existByName(p);
      if (!isExist) {
        await this._periodRepository.create(p);
      }
    }

    await this._cache.set(cacheKeyEnum.PERIOD, listPeriod);

    logger.info({ message: "Períodos criados com sucesso" });

    return true;
  }
}
