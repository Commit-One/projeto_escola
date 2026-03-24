import { inject, injectable } from "tsyringe";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";
import { IDisciplineRepository } from "../../../domain/repositories/IDisciplineRepository";

@injectable()
export class UpdateDisciplineUseCase {
  constructor(
    @inject(ContainerEnum.DISCIPLINE_REPOSITORY)
    private _repo: IDisciplineRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, name: string): Promise<boolean> {
    const discipline = await this._repo.update(uuid, name);

    if (!discipline) {
      logger.warn({
        message: "Ocorreu um erro ao atualizar a disciplina",
        disciplineUuid: uuid,
      });
      return false;
    }

    await this._cache.delete(cacheKeyEnum.DISCIPLINE);

    logger.info({
      message: "Atualização realizada com sucesso",
      disciplineUuid: uuid,
    });

    return true;
  }
}
