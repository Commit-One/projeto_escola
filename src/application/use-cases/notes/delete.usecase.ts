import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { INotesRepository } from "../../../domain/repositories/INotesRepository";

@injectable()
export class DeleteNotesUseCase {
  constructor(
    @inject(ContainerEnum.NOTES_REPOSITORY)
    private readonly _repo: INotesRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "Ocorreu um erro ao deletar relação",
        Notes: uuid,
      });
      return false;
    }

    await this._cache.delete(cacheKeyEnum.NOTES);
    logger.info({
      message: "Relação deletada com sucesso",
      Notes: uuid,
    });
    return true;
  }
}
