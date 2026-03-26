import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IClassStudentDTO } from "../../dtos/classStudent.dto";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class UpdateClassStudentUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_STUDENT_REPOSITORY)
    private _classRepository: IClassStudentRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(
    uuid: string,
    data: IClassStudentDTO,
  ): Promise<ClassStudent | null> {
    const classStudent = await this._classRepository.update(uuid, data);

    if (!classStudent) {
      logger.warn({
        message: "Ocorreu um erro ao atualizar a regra de classe e período",
        classStudent: uuid,
      });
      return null;
    }

    await this._cache.delete(cacheKeyEnum.CLASS);

    logger.info({
      message: "Atualização da relação de classe e aluno feita com sucesso",
      classStudent: uuid,
    });

    return classStudent;
  }
}
