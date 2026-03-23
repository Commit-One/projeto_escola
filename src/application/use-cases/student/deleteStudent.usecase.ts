import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class DeleteStudentUseCase {
  constructor(
    @inject(ContainerEnum.STUDENT_REPOSITORY)
    private readonly _repo: IStudentRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "Ocorreu um erro ao deletar o estudante",
        studentUuid: uuid,
      });
      return false;
    }

    logger.info({
      message: "Estudando deletado com sucesso",
      studentUuid: uuid,
    });

    await this._cache.delete(cacheKeyEnum.STUDENTS);
    return true;
  }
}
