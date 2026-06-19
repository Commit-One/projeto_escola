import { inject, injectable } from "tsyringe";
import { IScheduleRepository } from "../../../domain/repositories/IScheduleRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IScheduleDTO } from "../../dtos/schedule.dto";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

@injectable()
export class GetAllSchedulesUseCase {
  constructor(
    @inject(ContainerEnum.SCHEDULE_REPOSITORY)
    private _scheduleRepository: IScheduleRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  public async execute(schoolUuid: string): Promise<IScheduleDTO[]> {
    const cachedSchedules = await this._cache.get<IScheduleDTO[]>(
      `${cacheKeyEnum.SCHEDULE}:${schoolUuid}`,
    );

    if (cachedSchedules) {
      return cachedSchedules;
    }

    const list = await this._scheduleRepository.getAll(schoolUuid);
    await this._cache.set(`${cacheKeyEnum.SCHEDULE}:${schoolUuid}`, list);
    return list;
  }
}
