import { ICacheService } from "../../../domain/contracts/ICacheService";
import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class GetSchoolByNameUseCase {
  constructor(
    private readonly _repo: ISchoolRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(name: string) {
    const schoolsCached = await this._cache.get<School[]>(cacheKeyEnum.SCHOOLS);
    let school;

    if (!schoolsCached) school = await this._repo.findByName(name);
    else
      school = schoolsCached.find((s) =>
        s.name.toLowerCase().includes(name.toLowerCase()),
      );

    return school;
  }
}
