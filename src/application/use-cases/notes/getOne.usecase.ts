import { inject, injectable } from "tsyringe";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";
import { INotesRepository } from "../../../domain/repositories/INotesRepository";
import { Notes } from "../../../domain/entities/Notes";

@injectable()
export class GetOneNotesUseCase {
  constructor(
    @inject(ContainerEnum.DISCIPLINE_REPOSITORY)
    private _repo: INotesRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<Notes | null> {
    const cached = await this._cache.get<Notes[]>(cacheKeyEnum.NOTES);
    let discipline;

    if (!cached) discipline = await this._repo.getOne(uuid);
    else discipline = cached.find((s) => s.uuid.includes(uuid));

    return discipline ?? null;
  }
}
