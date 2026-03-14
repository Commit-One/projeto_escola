import { inject, injectable } from "tsyringe";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { IRedisService } from "../../../domain/contracts/IRedisService";

@injectable()
export class DeleteClassStudentUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_STUDENT_REPOSITORY)
    private _classRepository: IClassStudentRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._classRepository.delete(uuid);
    await this._cache.delete(cacheKeyEnum.CLASS);
    return deleted;
  }
}
