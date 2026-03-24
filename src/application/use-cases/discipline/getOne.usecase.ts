import { inject, injectable } from "tsyringe";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";
import { IDisciplineRepository } from "../../../domain/repositories/IDisciplineRepository";
import { Discipline } from "../../../domain/entities/Discipline";

@injectable()
export class GetOneDisciplineUseCase {
  constructor(
    @inject(ContainerEnum.DISCIPLINE_REPOSITORY)
    private _classRepository: IDisciplineRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<Discipline | null> {
    const disciplineCached = await this._cache.get<Discipline[]>(
      cacheKeyEnum.CLASS,
    );
    let discipline;

    if (!disciplineCached)
      discipline = await this._classRepository.getOne(uuid);
    else discipline = disciplineCached.find((s) => s.uuid.includes(uuid));

    return discipline ?? null;
  }
}
