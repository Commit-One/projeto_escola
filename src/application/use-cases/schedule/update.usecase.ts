import { inject, injectable } from "tsyringe";
import { IScheduleRepository } from "../../../domain/repositories/IScheduleRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IScheduleDTO } from "../../dtos/schedule.dto";
import { Schedule } from "../../../domain/entities/Schedule";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

@injectable()
export class UpdateScheduleUseCase {
  constructor(
    @inject(ContainerEnum.SCHEDULE_REPOSITORY)
    private _scheduleRepository: IScheduleRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  public async execute(uuid: string, data: IScheduleDTO): Promise<Schedule> {
    const schedule = await this._scheduleRepository.update(uuid, data);
    await this._cache.delete(`${cacheKeyEnum.SCHEDULE}:${data.schoolUuid}`);
    return schedule;
  }
}
