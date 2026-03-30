import { inject, injectable } from "tsyringe";
import { Employee } from "../../../domain/entities/Employee";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

@injectable()
export class GetOneEmployeeUseCase {
  constructor(
    @inject(ContainerEnum.EMPLOYEE_REPOSITORY)
    private readonly _repo: IEmployeeRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<Employee | null> {
    const cached = await this._cache.get<Employee[]>(cacheKeyEnum.EMPLOYEES);
    let discipline;

    if (!cached) discipline = await this._repo.getOne(uuid);
    else discipline = cached.find((s) => s.uuid.includes(uuid));

    return discipline ?? null;
  }
}
