import { IQueueService } from "../../../domain/contracts/IQueueService";
import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { QueueEnum } from "../../../utils/enum/queue";
import { SchoolDTO } from "../../dtos/school.dto";
import { inject, injectable } from "tsyringe";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";

@injectable()
export class CreateSchoolUseCase {
  constructor(
    @inject(ContainerEnum.SCHOOL_REPOSITORY)
    private readonly _repo: ISchoolRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,

    @inject(ContainerEnum.QUEUE_SERVICE)
    private readonly _queue: IQueueService,
  ) {}

  async execute(dto: SchoolDTO): Promise<School> {
    const school = await this._repo.createSchoolUserTransaction(dto);
    await this._cache.delete(cacheKeyEnum.SCHOOLS);

    await this._queue.sendToQueue<School>(QueueEnum.NOTIFICATION, school);
    return school;
  }
}
