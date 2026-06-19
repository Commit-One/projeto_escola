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

  async execute(uuid: string, schoolUuid: string): Promise<Employee | null> {
    const cached = await this._cache.get<Employee[]>(
      `${cacheKeyEnum.EMPLOYEES}:${schoolUuid}`,
    );
    let employee;

    if (!cached) employee = await this._repo.getOne(uuid);
    else employee = cached.find((s) => s.uuid === uuid);

    return employee ?? null;
  }
}
