import { inject, injectable } from "tsyringe";
import { Employee } from "../../../domain/entities/Employee";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { EmployeeDTO } from "../../dtos/employee.dto";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class UpdateEmployeeUseCase {
  constructor(
    @inject(ContainerEnum.EMPLOYEE_REPOSITORY)
    private readonly _repo: IEmployeeRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, data: EmployeeDTO): Promise<Employee | null> {
    const item = await this._repo.update(uuid, data);

    if (!item) {
      logger.warn({
        message:
          "Ocorreu um erro ao realizar o update de employee. Registro não encontrado",
        employeeId: uuid,
      });

      return item;
    }

    await this._cache.delete(cacheKeyEnum.EMPLOYEES);

    logger.info({
      message: "Employee atualizado com sucesso",
      employeeId: uuid,
    });

    return item;
  }
}
