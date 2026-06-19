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

  async execute(uuid: string, schoolUuid: string): Promise<Notes | null> {
    const cached = await this._cache.get<Notes[]>(
      `${cacheKeyEnum.NOTES}:${schoolUuid}`,
    );
    let notes;

    if (!cached) notes = await this._repo.getOne(uuid);
    else notes = cached.find((s) => s.uuid === uuid);

    return notes ?? null;
  }
}
