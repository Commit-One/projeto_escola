import { inject, injectable } from "tsyringe";
import { AcademicCycle } from "../../../domain/entities/AcademicCycle";
import { IAcademicCycleRepository } from "../../../domain/repositories/IAcademicCycleRepository";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { AcademicCycleDTO } from "../../dtos/academicCycle.dto";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class UpdateAcademicCycleUseCase {
  constructor(
    @inject(ContainerEnum.ACADEMIC_CYCLE_REPOSITORY)
    private readonly _repo: IAcademicCycleRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(
    uuid: string,
    data: AcademicCycleDTO,
  ): Promise<AcademicCycle | null> {
    const item = await this._repo.update(uuid, data);

    if (!item) {
      logger.warn({
        message:
          "Ocorreu um erro ao realizar o update de academicCycle. Registro não encontrado",
        academicCycleId: uuid,
      });

      return item;
    }

    await this._cache.delete(cacheKeyEnum.ACADEMIC_CYCLE);

    logger.info({
      message: "AcademicCycle atualizado com sucesso",
      academicCycleId: uuid,
    });

    return item;
  }
}
