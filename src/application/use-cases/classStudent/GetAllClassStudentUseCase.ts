import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class GetAllClassStudentUseCase {
  constructor(
    private _classRepository: IClassStudentRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(): Promise<ClassStudent[] | null> {
    const cachedClass = await this._cache.get<ClassStudent[]>(
      cacheKeyEnum.CLASS,
    );

    if (cachedClass) return cachedClass;

    const classStudents = await this._classRepository.getAll();
    await this._cache.set(cacheKeyEnum.CLASS, classStudents);
    return classStudents;
  }
}
