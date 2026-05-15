import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IDisciplineRepository } from "../../../domain/repositories/IDisciplineRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { Discipline } from "../../../domain/entities/Discipline";
import { DisciplineDTO } from "../../dtos/discipline.dto";

@injectable()
export class CreateDisciplineUseCase {
  constructor(
    @inject(ContainerEnum.DISCIPLINE_REPOSITORY)
    private readonly _repo: IDisciplineRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(data: DisciplineDTO): Promise<Discipline> {
    const discipline = await this._repo.create(data);
    await this._cache.delete(cacheKeyEnum.DISCIPLINE);
    logger.info({
      message: "Disciplina criada com sucesso",
      schoolId: discipline.uuid,
    });
    return discipline;
  }
}
