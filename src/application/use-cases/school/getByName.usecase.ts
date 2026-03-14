import { inject, injectable } from "tsyringe";
import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";

@injectable()
export class GetSchoolByNameUseCase {
  constructor(
    @inject(ContainerEnum.SCHOOL_REPOSITORY)
    private readonly _repo: ISchoolRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
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
