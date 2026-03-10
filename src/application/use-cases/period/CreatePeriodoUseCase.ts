import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class CreatePeriodUseCase {
  constructor(
    private _periodRepository: IPeriodRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(): Promise<boolean> {
    const listProfile = ["manhã", "tarde", "noite"];

    listProfile.forEach(async (profile) => {
      const isExist = await this._periodRepository.existByName(profile);
      if (!isExist) await this._periodRepository.createPeriodo(profile);
    });

    await this._cache.set(cacheKeyEnum.PERIOD, listProfile);

    return true;
  }
}
