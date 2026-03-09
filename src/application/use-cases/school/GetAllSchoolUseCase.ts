import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { ICacheRepository } from "../../../infra/cache/cache.repository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class GetAllSchoolUseCase {
  constructor(
    private readonly _repo: ISchoolRepository,
    private readonly _cache: ICacheRepository,
  ) {}

  async execute() {
    const cachedSchools = await this._cache.get<School[]>(cacheKeyEnum.SCHOOLS);
    if (cachedSchools) return cachedSchools;

    const schools = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.SCHOOLS, schools);

    return schools;
  }
}
