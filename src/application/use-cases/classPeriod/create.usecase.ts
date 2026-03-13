import { ICacheService } from "../../../domain/contracts/ICacheService";
import { ClassPeriod } from "../../../domain/entities/ClassPeriod";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassPeriodDTO } from "../../dtos/classPeriod.dto";

export class CreateClassPeriodUseCase {
  constructor(
    private _repo: IClassPeriodRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(data: ClassPeriodDTO): Promise<ClassPeriod> {
    const created = await this._repo.create(data);
    await this._cache.delete(cacheKeyEnum.CLASS_PERIOD);
    return created;
  }
}
