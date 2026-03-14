import { inject, injectable } from "tsyringe";
import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";

@injectable()
export class GetAllSchoolUseCase {
  constructor(
    @inject(ContainerEnum.SCHOOL_REPOSITORY)
    private readonly _repo: ISchoolRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute() {
    const cachedSchools = await this._cache.get<School[]>(cacheKeyEnum.SCHOOLS);
    if (cachedSchools) return cachedSchools;

    const schools = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.SCHOOLS, schools);

    return schools;
  }
}
