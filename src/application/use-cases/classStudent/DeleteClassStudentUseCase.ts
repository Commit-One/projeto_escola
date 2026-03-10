import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class DeleteClassStudentUseCase {
  constructor(
    private _classRepository: IClassStudentRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._classRepository.delete(uuid);
    await this._cache.delete(cacheKeyEnum.CLASS);
    return deleted;
  }
}
