import { inject, injectable } from "tsyringe";
import { Media } from "../../../domain/entities/Media";
import { IMediaRepository } from "../../../domain/repositories/IMediaRepository";
import { MediaDTO } from "../../dtos/media.dto";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class CreateMediaUseCase {
  constructor(
    @inject(ContainerEnum.MEDIA_REPOSITORY)
    private readonly _repo: IMediaRepository,
  ) {}

  async execute(data: MediaDTO): Promise<Media> {
    const created = await this._repo.create(data);

    logger.info({
      message: "Media criada com sucesso",
      mediaId: created.uuid,
    });

    return created;
  }
}
