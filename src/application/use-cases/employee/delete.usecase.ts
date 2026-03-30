import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class DeleteEmployeeUseCase {
  constructor(
    @inject(ContainerEnum.EMPLOYEE_REPOSITORY)
    private readonly _repo: IEmployeeRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "Employee não encontrado",
        employeeId: uuid,
      });

      return false;
    }

    await this._cache.delete(cacheKeyEnum.EMPLOYEES);

    logger.info({
      message: "Employee deletado com sucesso",
      employeeId: uuid,
    });

    return true;
  }
}
