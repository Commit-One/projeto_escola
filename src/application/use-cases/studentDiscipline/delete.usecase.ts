import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IStudentDisciplineRepository } from "../../../domain/repositories/IStudentDisciplineRepository";

@injectable()
export class DeleteStudentDisciplineUseCase {
  constructor(
    @inject(ContainerEnum.STUDENT_DISCIPLINE_REPOSITORY)
    private readonly _repo: IStudentDisciplineRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "Ocorreu um erro ao deletar relação",
        studentDiscipline: uuid,
      });
      return false;
    }

    await this._cache.delete(cacheKeyEnum.STUDENT_DISCIPLINE);
    logger.info({
      message: "Relação deletada com sucesso",
      studentDiscipline: uuid,
    });
    return true;
  }
}
