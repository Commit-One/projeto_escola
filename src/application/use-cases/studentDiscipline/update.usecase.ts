import { inject, injectable } from "tsyringe";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";
import { IStudentDisciplineRepository } from "../../../domain/repositories/IStudentDisciplineRepository";
import { StudentDisciplineDTO } from "../../dtos/studentDiscipline.dto";

@injectable()
export class UpdateStudentDisciplineUseCase {
  constructor(
    @inject(ContainerEnum.DISCIPLINE_REPOSITORY)
    private _repo: IStudentDisciplineRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, data: StudentDisciplineDTO): Promise<boolean> {
    const discipline = await this._repo.update(uuid, data);

    if (!discipline) {
      logger.warn({
        message: "Ocorreu um erro ao atualizar a relação",
        uuid: uuid,
      });
      return false;
    }

    await this._cache.delete(cacheKeyEnum.STUDENT_DISCIPLINE);

    logger.info({
      message: "Atualização realizada com sucesso",
      uuid: uuid,
    });

    return true;
  }
}
