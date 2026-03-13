import { ICacheService } from "../../../domain/contracts/ICacheService";
import { ClassPeriod } from "../../../domain/entities/ClassPeriod";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class GetAllClassPeriodUseCase {
  constructor(
    private _repo: IClassPeriodRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(): Promise<ClassPeriod[]> {
    const list = await this._repo.getAll();
    await this._cache.delete(cacheKeyEnum.CLASS_PERIOD);
    return list;
  }
}
