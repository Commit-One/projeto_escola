import { ICacheService } from "../../../domain/contracts/ICacheService";
import { IQueueService } from "../../../domain/contracts/IQueueService";
import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { QueueEnum } from "../../../utils/enum/queue";
import { SchoolDTO } from "../../dtos/SchoolDTO";

export class CreateSchoolUseCase {
  constructor(
    private readonly _repo: ISchoolRepository,
    private readonly _cache: ICacheService,
    private readonly _queue: IQueueService
  ) { }

  async execute(dto: SchoolDTO): Promise<School> {    
    const created = await this._repo.createSchoolUserTransaction(dto);
    await this._cache.delete(cacheKeyEnum.SCHOOLS);

    await this._queue.sendToQueue(
      QueueEnum.NOTIFICATION,
      { name: created.name }
    )
    return created;
  }
}
