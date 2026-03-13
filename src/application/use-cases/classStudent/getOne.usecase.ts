import { ICacheService } from "../../../domain/contracts/ICacheService";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class GetOneClassStudentUseCase {
  constructor(
    private _classRepository: IClassStudentRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(uuid: string): Promise<ClassStudent | null> {
    const classStudentCached = await this._cache.get<ClassStudent[]>(
      cacheKeyEnum.CLASS,
    );
    let classStudent;

    if (!classStudentCached)
      classStudent = await this._classRepository.getOne(uuid);
    else classStudent = classStudentCached.find((s) => s.uuid.includes(uuid));

    return classStudent ?? null;
  }
}
