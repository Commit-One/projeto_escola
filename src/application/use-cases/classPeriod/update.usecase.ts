import { ICacheService } from "../../../domain/contracts/ICacheService";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassPeriodDTO } from "../../dtos/classPeriod.dto";

export class UpdateClassPeriodUseCase {
  constructor(
    private _repo: IClassPeriodRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(uuid: string, data: ClassPeriodDTO): Promise<boolean> {
    const classPeriod = await this._repo.update(uuid, data);
    if (classPeriod) await this._cache.delete(cacheKeyEnum.CLASS_PERIOD);
    return classPeriod;
  }
}
