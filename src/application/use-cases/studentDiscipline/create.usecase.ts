import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IStudentDisciplineRepository } from "../../../domain/repositories/IStudentDisciplineRepository";
import { StudentDisciplineDTO } from "../../dtos/studentDiscipline.dto";
import { StudentDiscipline } from "../../../domain/entities/StudentDiscipline";

@injectable()
export class CreateStudentDisciplineUseCase {
  constructor(
    @inject(ContainerEnum.STUDENT_DISCIPLINE_REPOSITORY)
    private readonly _repo: IStudentDisciplineRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(data: StudentDisciplineDTO): Promise<StudentDiscipline> {
    const studentDiscipline = await this._repo.create(data);
    await this._cache.delete(cacheKeyEnum.STUDENT_DISCIPLINE);
    logger.info({
      message: "Relação criada com sucesso",
      schoolId: studentDiscipline.uuid,
    });
    return studentDiscipline;
  }
}
