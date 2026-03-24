import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IDisciplineRepository } from "../../../domain/repositories/IDisciplineRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

@injectable()
export class DeleteDisciplineUseCase {
  constructor(
    @inject(ContainerEnum.DISCIPLINE_REPOSITORY)
    private readonly _repo: IDisciplineRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "Ocorreu um erro ao deletar disciplina",
        classStudent: uuid,
      });
      return false;
    }

    await this._cache.delete(cacheKeyEnum.DISCIPLINE);
    logger.info({
      message: "Disciplina deletada com sucesso",
      uuid: uuid,
    });
    return true;
  }
}
