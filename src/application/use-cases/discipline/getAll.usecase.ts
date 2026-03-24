import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IDisciplineRepository } from "../../../domain/repositories/IDisciplineRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { Discipline } from "../../../domain/entities/Discipline";

@injectable()
export class GetAllDisciplineUseCase {
  constructor(
    @inject(ContainerEnum.DISCIPLINE_REPOSITORY)
    private readonly _repo: IDisciplineRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(): Promise<Discipline[]> {
    const cachedDiscipline = await this._cache.get<Discipline[]>(
      cacheKeyEnum.DISCIPLINE,
    );

    if (cachedDiscipline) return cachedDiscipline;

    const list = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.DISCIPLINE, list);
    return list;
  }
}
