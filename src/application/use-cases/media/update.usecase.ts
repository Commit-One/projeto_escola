import { inject, injectable } from "tsyringe";
import { Media } from "../../../domain/entities/Media";
import { IMediaRepository } from "../../../domain/repositories/IMediaRepository";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { MediaDTO } from "../../dtos/media.dto";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class UpdateMediaUseCase {
  constructor(
    @inject(ContainerEnum.MEDIA_REPOSITORY)
    private readonly _repo: IMediaRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, data: MediaDTO): Promise<Media | null> {
    const item = await this._repo.update(uuid, data);

    if (!item) {
      logger.warn({
        message:
          "Ocorreu um erro ao realizar o update de media. Registro não encontrado",
        mediaId: uuid,
      });

      return item;
    }

    await this._cache.delete(cacheKeyEnum.MEDIAS);

    logger.info({
      message: "Media atualizado com sucesso",
      mediaId: uuid,
    });

    return item;
  }
}
