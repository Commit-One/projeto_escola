import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { Notes } from "../../../domain/entities/Notes";
import { INotesRepository } from "../../../domain/repositories/INotesRepository";

@injectable()
export class GetAllNotesUseCase {
  constructor(
    @inject(ContainerEnum.NOTES_REPOSITORY)
    private readonly _repo: INotesRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(): Promise<Notes[]> {
    const cached = await this._cache.get<Notes[]>(cacheKeyEnum.NOTES);

    if (cached) return cached;

    const list = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.NOTES, list);
    return list;
  }
}
