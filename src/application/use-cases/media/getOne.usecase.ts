import { inject, injectable } from "tsyringe";
import { Media } from "../../../domain/entities/Media";
import { IMediaRepository } from "../../../domain/repositories/IMediaRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IRedisService } from "../../../domain/contracts/IRedisService";

@injectable()
export class GetOneMediaUseCase {
  constructor(
    @inject(ContainerEnum.MEDIA_REPOSITORY)
    private readonly _repo: IMediaRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<Media | null> {
    const cached = await this._cache.get<Media[]>(cacheKeyEnum.MEDIAS);
    let media;

    if (!cached) media = await this._repo.getOne(uuid);
    else media = cached.find((s) => s.uuid.includes(uuid));

    return media ?? null;
  }
}
