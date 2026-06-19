import { inject, injectable } from "tsyringe";
import { Media } from "../../../domain/entities/Media";
import { IMediaRepository } from "../../../domain/repositories/IMediaRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IRedisService } from "../../../domain/contracts/IRedisService";

@injectable()
export class GetAllMediaUseCase {
  constructor(
    @inject(ContainerEnum.MEDIA_REPOSITORY)
    private readonly _repo: IMediaRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(schoolUuid: string): Promise<Media[]> {
    const cached = await this._cache.get<Media[]>(
      `${cacheKeyEnum.MEDIAS}:${schoolUuid}`,
    );

    if (cached) return cached;

    const list = await this._repo.getAll();
    await this._cache.set(`${cacheKeyEnum.MEDIAS}:${schoolUuid}`, list);
    return list;
  }
}
