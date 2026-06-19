import { inject, injectable } from "tsyringe";
import { IScheduleRepository } from "../../../domain/repositories/IScheduleRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

@injectable()
export class DeleteScheduleUseCase {
  constructor(
    @inject(ContainerEnum.SCHEDULE_REPOSITORY)
    private _scheduleRepository: IScheduleRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  public async execute(uuid: string, schoolUuid: string): Promise<boolean> {
    const schedule = await this._scheduleRepository.delete(uuid);
    await this._cache.delete(`${cacheKeyEnum.SCHEDULE}:${schoolUuid}`);
    return schedule;
  }
}
