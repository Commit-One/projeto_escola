import { Period } from "../../../domain/entities/Period";
import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class CreatePeriodUseCase {
  constructor(
    private _periodRepository: IPeriodRepository,
    private readonly _cache: ICacheService,
  ) { }

  async execute(): Promise<boolean> {
    const listPeriod = ["Manhã", "Tarde", "Noite"];

    for (const p of listPeriod) {
      const isExist = await this._periodRepository.existByName(p);
      if (!isExist) {        
        await this._periodRepository.create(p);
      }
    }

    await this._cache.set(cacheKeyEnum.PERIOD, listPeriod);

    return true;
  }
}
