import { inject, injectable } from "tsyringe";
import { ClassPeriod } from "../../../domain/entities/ClassPeriod";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassPeriodDTO } from "../../dtos/classPeriod.dto";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class CreateClassPeriodUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_PERIOD_REPOSITORY)
    private _repo: IClassPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(data: ClassPeriodDTO): Promise<ClassPeriod> {
    const classPeriod = await this._repo.create(data);
    await this._cache.delete(cacheKeyEnum.CLASS_PERIOD);

    logger.info({
      message: "Regra de classe e período criado com sucesso",
      schoolId: classPeriod.uuid,
    });

    return classPeriod;
  }
}
