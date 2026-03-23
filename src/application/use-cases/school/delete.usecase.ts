import { inject, injectable } from "tsyringe";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class DeleteSchoolUseCase {
  constructor(
    @inject(ContainerEnum.SCHOOL_REPOSITORY)
    private readonly _repo: ISchoolRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "Escola não encontrada",
        schoolId: uuid,
      });

      return false;
    }

    await this._cache.delete(cacheKeyEnum.SCHOOLS);

    logger.info({
      message: "Escola deletada com sucesso",
      schoolId: uuid,
    });

    return true;
  }
}
