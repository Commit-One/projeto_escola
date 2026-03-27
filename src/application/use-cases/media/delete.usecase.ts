import { inject, injectable } from "tsyringe";
import { IMediaRepository } from "../../../domain/repositories/IMediaRepository";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class DeleteMediaUseCase {
  constructor(
    @inject(ContainerEnum.MEDIA_REPOSITORY)
    private readonly _repo: IMediaRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "Media não encontrada",
        mediaId: uuid,
      });

      return false;
    }

    await this._cache.delete(cacheKeyEnum.MEDIAS);

    logger.info({
      message: "Media deletado com sucesso",
      mediaId: uuid,
    });

    return true;
  }
}
