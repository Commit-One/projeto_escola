import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { StatusEnum } from "../../../utils/enum/status";

@injectable()
export class UpdateStatusSchoolUseCase {
  constructor(
    @inject(ContainerEnum.SCHOOL_REPOSITORY)
    private readonly _repo: ISchoolRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, status: StatusEnum): Promise<boolean> {
    const updated = await this._repo.updateStatus(uuid, status);
    if (updated) await this._cache.delete(cacheKeyEnum.SCHOOLS);
    return updated;
  }
}
