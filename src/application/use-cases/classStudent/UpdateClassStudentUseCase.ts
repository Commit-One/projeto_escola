import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { IProfileRepository } from "../../../domain/repositories/IProfileRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassStudentDTO } from "../../dtos/ClassStudentDTO";

export class UpdateClassStudentUseCase {
  constructor(
    private _classRepository: IClassStudentRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(uuid: string, data: ClassStudentDTO): Promise<ClassStudent> {
    const classStudent = await this._classRepository.update(uuid, data);
    if (classStudent) await this._cache.delete(cacheKeyEnum.CLASS);
    return classStudent;
  }
}
