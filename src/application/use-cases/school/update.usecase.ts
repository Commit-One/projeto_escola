import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { SchoolDTO } from "../../dtos/school.dto";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class UpdateSchoolUseCase {
  constructor(
    @inject(ContainerEnum.SCHOOL_REPOSITORY)
    private readonly _repo: ISchoolRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, data: SchoolDTO): Promise<School> {
    const school = await this._repo.update(uuid, data);

    if (!school) {
      logger.warn({
        message:
          "Ocorreu um erro ao realizar o update da escola. Registro não encontrado",
        schoolId: uuid,
      });

      return school;
    }

    await this._cache.delete(cacheKeyEnum.SCHOOLS);

    logger.info({
      message: "Escola atualizada com sucesso",
      schoolId: uuid,
    });

    return school;
  }
}
