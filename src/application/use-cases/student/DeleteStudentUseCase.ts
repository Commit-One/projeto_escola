import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { ICacheRepository } from "../../../infra/cache/cache.repository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class DeleteStudentUseCase {
  constructor(
    private readonly _repo: IStudentRepository,
    private readonly _cache: ICacheRepository,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);
    if (deleted) await this._cache.delete(cacheKeyEnum.STUDENTS);
    return deleted;
  }
}
