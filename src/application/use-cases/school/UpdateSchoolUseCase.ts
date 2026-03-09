import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { ICacheRepository } from "../../../infra/cache/cache.repository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { SchoolDTO } from "../../dtos/SchoolDTO";

export class UpdateSchoolUseCase {
  constructor(
    private readonly _repo: ISchoolRepository,
    private readonly _cache: ICacheRepository,
  ) {}

  async execute(uuid: string, data: SchoolDTO): Promise<School> {
    const school = await this._repo.update(uuid, data);
    if (school) await this._cache.delete(cacheKeyEnum.SCHOOLS);
    return school;
  }
}
