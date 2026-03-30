import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { StatusEnum } from "../../../utils/enum/status";

@injectable()
export class UpdateStatusEmployeeUseCase {
  constructor(
    @inject(ContainerEnum.EMPLOYEE_REPOSITORY)
    private readonly _repo: IEmployeeRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, status: StatusEnum): Promise<boolean> {
    const item = await this._repo.updateStatus(uuid, status);

    if (!item) {
      logger.warn({
        message:
          "Ocorreu um erro ao realizar o update do status employee. Registro não encontrado",
        employeeId: uuid,
      });

      return item;
    }

    await this._cache.delete(cacheKeyEnum.EMPLOYEES);

    logger.info({
      message: "Status do employee atualizado com sucesso",
      employeeId: uuid,
    });

    return item;
  }
}
