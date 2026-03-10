import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassStudentDTO } from "../../dtos/ClassStudentDTO";

export class GetAllClassStudentUseCase {
  constructor(
    private _classRepository: IClassStudentRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(): Promise<ClassStudentDTO[] | null> {
    const cachedClass = await this._cache.get<ClassStudentDTO[]>(
      cacheKeyEnum.CLASS,
    );

    if (cachedClass) return cachedClass;

    const classStudents = await this._classRepository.getAll();
    await this._cache.set(cacheKeyEnum.CLASS, classStudents);
    return classStudents;
  }
}
