import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { ICacheRepository } from "../../../infra/cache/cache.repository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StatusEnum } from "../../../utils/enum/status";

export class UpdateStatusStudentUseCase {
  constructor(
    private readonly _repo: IStudentRepository,
    private readonly _cache: ICacheRepository,
  ) {}

  async execute(uuid: string, status: StatusEnum): Promise<boolean> {
    const updated = await this._repo.updateStatus(uuid, status);
    await this._cache.delete(cacheKeyEnum.STUDENTS);
    return updated;
  }
}
