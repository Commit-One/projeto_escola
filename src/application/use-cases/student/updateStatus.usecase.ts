import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StatusEnum } from "../../../utils/enum/status";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class UpdateStatusStudentUseCase {
  constructor(
    @inject(ContainerEnum.STUDENT_REPOSITORY)
    private readonly _repo: IStudentRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, status: StatusEnum): Promise<boolean> {
    const updated = await this._repo.updateStatus(uuid, status);

    if (!updated) {
      logger.warn({
        message: "Status do aluno não atualizado",
        schoolId: uuid,
      });

      return false;
    }

    await this._cache.delete(cacheKeyEnum.STUDENTS);

    logger.info({
      message: "Status do aluno atualizado com sucesso",
      schoolId: uuid,
    });

    return true;
  }
}
