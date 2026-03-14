import { inject, injectable } from "tsyringe";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassPeriodDTO } from "../../dtos/classPeriod.dto";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";

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
    if (classPeriod) await this._cache.delete(cacheKeyEnum.CLASS_PERIOD);

    return !!classPeriod.uuid;
  }
}
