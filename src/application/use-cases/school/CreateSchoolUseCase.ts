import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { SchoolDTO } from "../../dtos/SchoolDTO";

export class CreateSchoolUseCase {
  constructor(
    private readonly _repo: ISchoolRepository,
    private readonly _cache: ICacheService,
  ) { }

  async execute(dto: SchoolDTO): Promise<School> {
    const created = await this._repo.createSchoolUserTransaction(dto);
    await this._cache.delete(cacheKeyEnum.SCHOOLS);

    return created;
  }
}
