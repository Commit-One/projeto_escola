import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { SchoolDTO } from "../../dtos/school.dto";
import { inject, injectable } from "tsyringe";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class CreateSchoolUseCase {
  constructor(
    @inject(ContainerEnum.SCHOOL_REPOSITORY)
    private readonly _repo: ISchoolRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(dto: SchoolDTO): Promise<School> {
    const school = await this._repo.create(dto);

    await this._cache.delete(cacheKeyEnum.SCHOOLS);

    logger.info({
      message: "Escola criada com sucesso!",
      schoolUuid: school.uuid,
    });

    return school;
  }
}
