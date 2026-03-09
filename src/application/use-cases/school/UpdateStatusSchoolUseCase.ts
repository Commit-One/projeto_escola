import { School } from "../../../domain/entities/School";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { ICacheRepository } from "../../../infra/cache/cache.repository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StatusEnum } from "../../../utils/enum/status";
import { SchoolDTO } from "../../dtos/SchoolDTO";

export class UpdateStatusSchoolUseCase {
  constructor(
    private readonly _repo: ISchoolRepository,
    private readonly _cache: ICacheRepository,
  ) {}

  async execute(uuid: string, status: StatusEnum): Promise<boolean> {
    const updated = await this._repo.updateStatus(uuid, status);
    if (updated) await this._cache.delete(cacheKeyEnum.SCHOOLS);
    return updated;
  }
}
