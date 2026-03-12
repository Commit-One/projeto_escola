import { ICacheService } from "../../../domain/contracts/ICacheService";
import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class GetAllSchoolUseCase {
  constructor(
    private readonly _repo: ISchoolRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute() {
    const cachedSchools = await this._cache.get<School[]>(cacheKeyEnum.SCHOOLS);
    if (cachedSchools) return cachedSchools;

    const schools = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.SCHOOLS, schools);

    return schools;
  }
}
