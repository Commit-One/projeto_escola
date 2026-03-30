import { inject, injectable } from "tsyringe";
import { Employee } from "../../../domain/entities/Employee";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

@injectable()
export class GetAllEmployeeUseCase {
  constructor(
    @inject(ContainerEnum.EMPLOYEE_REPOSITORY)
    private readonly _repo: IEmployeeRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(): Promise<Employee[]> {
    const cached = await this._cache.get<Employee[]>(cacheKeyEnum.EMPLOYEES);

    if (cached) return cached;

    const list = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.EMPLOYEES, list);
    return list;
  }
}
