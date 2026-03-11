import { ICacheService } from "../../../domain/contracts/ICacheService";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassStudentDTO } from "../../dtos/ClassStudentDTO";

export class CreateClassStudentuUseCase {
  constructor(
    private _classRepository: IClassStudentRepository,
    private readonly _cache: ICacheService,

  ) { }

  async execute(data: ClassStudentDTO): Promise<ClassStudent> {
    const created = await this._classRepository.create(data);
    await this._cache.delete(cacheKeyEnum.CLASS);
    return created;
  }
}
