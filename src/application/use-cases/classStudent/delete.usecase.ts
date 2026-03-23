import { inject, injectable } from "tsyringe";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class DeleteClassStudentUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_STUDENT_REPOSITORY)
    private _classRepository: IClassStudentRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._classRepository.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "Ocorreu um erro ao deletar a relação de aluno e classe",
        classStudent: uuid,
      });
      return false;
    }

    await this._cache.delete(cacheKeyEnum.CLASS);

    logger.info({
      message: "Relação de aluno e classe deletada com sucesso",
      classStudent: uuid,
    });

    return true;
  }
}
