import { inject, injectable } from "tsyringe";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class GetOneClassStudentUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_STUDENT_REPOSITORY)
    private _classRepository: IClassStudentRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
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
