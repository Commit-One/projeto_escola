import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassIStudentDTO } from "../../dtos/classStudent.dto";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class CreateClassStudentuUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_STUDENT_REPOSITORY)
    private _classRepository: IClassStudentRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(data: ClassIStudentDTO): Promise<ClassStudent> {
    const classStudent = await this._classRepository.create(data);
    await this._cache.delete(cacheKeyEnum.CLASS);
    logger.info({
      message: "Regra de classe e período criado com sucesso",
      schoolId: classStudent.uuid,
    });
    return classStudent;
  }
}
